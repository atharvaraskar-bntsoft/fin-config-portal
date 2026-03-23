import { Observable, of } from "rxjs";

const getCorePropertiesByIdJSON = {
    status: "success",
    message: "Find CoreProperties",
    data: {
        type: "L2",
        subType: "Core",
        name: "XUZ",
        id: 12,
        version: 0,
        saveDraft: null,
        properties: {
            core: [
                {
                    field: "server.port",
                    fileName: null,
                    value: "0",
                    label: "server port",
                    format: "",
                    hidden: false,
                    datatype: "Integer",
                    mandatory: true,
                    listvalues: null,
                    isEditable: false
                }
            ]
        }
    }
}


export class CorePropertiesMockService {



  getCorePropetiesList(payload?: any): Observable<any>{
    return of({});
  }

  deleteCoreProperties(): Observable<any> {
    return of({});
  }

  getDefaultProperties(): Observable<any> {
    return of({});
  }

  getCorePropertiesById(versionId: any): Observable<any> {
    return of(getCorePropertiesByIdJSON);
  }

  validateCorePropertiesName(name: string): Observable<any> {
    return of({});
  }

  saveCoreProperties(requestBody: any): Observable<any> {
    return of({});
  }

}
