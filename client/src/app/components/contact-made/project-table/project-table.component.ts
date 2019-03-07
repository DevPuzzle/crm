import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/shared/interfaces';
import { ContactMadeGQLService } from '../services/contact-made-qql.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ProjectComponent } from '../project/project.component';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {
  projects: Project[];
  projectsData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'client', 'employee', 'status', 'platform', 'link', 'info', 'notification', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(
    private contactMadeGQLService: ContactMadeGQLService,
    private dialog: MatDialog,
    private dialogService: DialogService
    ) { }

  ngOnInit() {
    this.contactMadeGQLService
      .getProjects()
      .subscribe( ({data, loading}) => {
        // console.log(data);
        const {projects} = data;
        this.projects = projects;
        this.projectsData = new MatTableDataSource(this.projects);
        for (const item of this.projectsData.filteredData ) {
          for (const field in item) {
            if (item[field] == null) {
              item[field] = '';
            }
          }
        }
        this.projectsData.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'client': return item.client.name;
            case 'employee': return item.employee.name;
            case 'status': return item.status.name;
            case 'platform': return item.platform.name;
            default: return item[property];
          }
        };
        this.projectsData.sort = this.sort;
        this.projectsData.paginator = this.paginator;

        this.projectsData.filterPredicate = (alldata, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return this.nestedFilterCheck(currentTerm, alldata, key);
          };
          const dataStr = Object.keys(alldata).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
      });
    // const id = '5c4ac8aa7b5b7705adab75d4';
    // this.contactMadeGQLService
    //   .getProjectsByEmployee(id)
    //   .subscribe( ({data, loading}) => {
    //     console.log('___data___', data);
    //     // const {clients} = data;
    //     // this.clients = clients;
    //   });
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(ProjectComponent, dialogConfig);
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ProjectComponent, {
      disableClose: false,
      autoFocus: true,
      data: row
    });
  }

  onDelete(id) {
    this.dialogService.openConfirmDialog('Are you sure to delete this project?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.contactMadeGQLService.deleteProject(id);
      }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.projectsData.filter = this.searchKey.trim().toLowerCase();
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
}
