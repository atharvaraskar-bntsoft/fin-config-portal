import { Component, OnInit } from '@angular/core';
import { FileElement } from '../file-manager/model/element';
import { FileService } from '../services/file.service';
import { v4 } from 'uuid';
import { RuntimePropertiesService } from '@app/services/runtime-Properties.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-runtime-properties',
  templateUrl: './runtime-properties.component.html',
  styleUrls: ['./runtime-properties.component.scss'],
})
export class RuntimePropertiesComponent implements OnInit {
  public fileElements: Observable<FileElement[]>;
  public folderList = [];
  currentRoot: FileElement;
  currentPath: string;
  canNavigateUp = false;
  public fileDetails:any = {};
  showFileDataflag = false;

  constructor(
    public fileService: FileService,
    public _runtimePropertiesService: RuntimePropertiesService,
  ) {
    this.fatchFolderData();
  }
 
  ngOnInit() {}
  fatchFolderData() {
    this._runtimePropertiesService.getRuntimeProperty().subscribe((resultDetails: any) => {
      if (resultDetails) {
        this.fileService.reset();
        if (resultDetails.data.content.length>0) {
        this.folderList = resultDetails.data.content;
        this.folderList.forEach((item, index) => {
          let fullpath = null;
          fullpath = item.path.split('\\');
          item.path = fullpath.join('/');
          item.path = item.path.substring(1);
          item.path = item.path.concat('/');
          item['id'] = v4();
        });
        // add in service
        this.folderList.forEach((item, index) => {
          if (item.parent == 'root') {
            this.fileService.add(item);
          } else {
            let pathlist = [];
            pathlist = item.path.split('/');
            pathlist.forEach((pathitem, index) => {
              var result = this.folderList.find(
                o => o.name === pathitem && o.path == this.makePath(item.path),
              );
              if (result) {
                item.parent = result['id'];
                this.fileService.add(item);
              }
            });
          }
        });
      
        this.updateFileElementQuery();
      }
      }
    });
  }

  addFolder(folder: { name: string }) {
    this.fileService.add({
      isFolder: true,
      name: folder.name,
      parent: this.currentRoot ? this.currentRoot.id : 'root',
    });
    this.updateFileElementQuery();
  }

  setFileData(fileDetails){
     this.showFileDataflag =  true;
     this.fileDetails = fileDetails;
     this._runtimePropertiesService.sendItems(this.fileDetails);
  }

  removeElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(
      this.currentRoot ? this.currentRoot.id : 'root',
    );
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

  makePath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    if (p != '') {
      return p;
    } else {
      return '/';
    }
  }
}
