import { HttpClient } from '@angular/common/http';
import { Statement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { JsonSQLite } from 'jeep-sqlite/dist/types/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  public dbReady : BehaviorSubject <boolean>
  public isWeb: boolean;
  public isIOS: boolean;
  public dbName : string;
  constructor(
    private http : HttpClient
  ) { 
    this.dbReady = new BehaviorSubject(false);
    this.isIOS = false;
    this.isWeb= false;
    this.dbName='';
  }

  async init(){
    const info = await Device.getInfo();
    const sqlite= CapacitorSQLite as any;
    if(info.platform=='android'){
      try {
        await sqlite.requestPermissions();

      } catch(error){
        console.error("Esta app necesita permisos para funcionar")
      }
      

    }else if(info.platform=='web'){
      this.isWeb = true;
      await sqlite.initWebStore();

    }else if (info.platform=='ios'){
      this.isIOS=true;

    }
    this.setupdatabase();

  }

  async setupdatabase(){
    const dbSetup = await Preferences.get({key : 'first_setup_ley'})

    if(!dbSetup.value){
      this.downloadDatabase();

    }else{
      this.dbName = await this.getDbName();
      await CapacitorSQLite.createConnection({database:this.dbName});
      await CapacitorSQLite.open({database:this.dbName})
      this.dbReady.next(true);
    }

  }
  downloadDatabase(){
    this.http.get('assets/db/db.json').subscribe(
    async (jsonExport: JsonSQLite)=>{

      const jsonstring = JSON.stringify(jsonExport);
      const isValid = await CapacitorSQLite.isJsonValid({jsonstring});

      if(isValid.result){
        this.dbName=jsonExport.database;
        await CapacitorSQLite.importFromJson({jsonstring});
        await CapacitorSQLite.createConnection({database:this.dbName});
        await CapacitorSQLite.open({database:this.dbName})

        await Preferences.set({key : 'first_setup_ley',value:'1'})

        await Preferences.set({key : 'dbname',value:this.dbName})
        this.dbReady.next(true);

      }

    })

    
  }

  async getDbName(){
    if(!this.dbName){
      const dbname = await Preferences.get({key : 'dbname'})
      if (dbname.value){
        this.dbName=dbname.value
      }
    }
    return this.dbName;
  }

  async create(rut : string, nombre : string,edad : number, direccion: string, correo_electronico: string, telefono : string){
    let sql = 'INSERT INTO alumnos(rut,nombre, edad,direccion, correo_electronico,telefono) VALUES(?,?,?,?,?,?)';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set:[
        {
          statement : sql,
          values : [
            rut,
            nombre,
            edad,
            direccion,
            correo_electronico,
            telefono
          ]
        }
      ]
    }).then((changes : capSQLiteChanges)=>{
      if(this.isWeb){
        CapacitorSQLite.saveToStore({database: dbName})
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }
  async read(){
    let sql = 'SELECT * FROM alumnos';
    const dbName = await this.getDbName();
    return CapacitorSQLite.query({
      database : dbName,
      statement : sql,
      values : []
    }).then((response : capSQLiteValues)=>{
      let alumnos : string[] =[];

      if(this.isIOS && response.values.length > 0){
        response.values.shift();
      }

      for (let index = 0; index < response.values.length; index ++){
        const alumno = response.values[index];
        alumnos.push(alumno);
      }
      return alumnos;
    }).catch(err => Promise.reject(err))
  }

  async update(newrut: string, originalrut: string, newnombre : string , originalnombre:string
    ,newedad: number , originaledad:number, newdireccion:string, originaldireccion:string,
    newCorreo_Electronico: string, originalCorreo_Electronico:string, newtelefono:string,originaltelefono : string){
    let sql= 'UPDATE alumnos SET rut=? , Nombre = ? , Edad = ? , Direccion =?, Correo_Electronico = ?, Telefono =? Where rut=?';
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database: dbName,
      set : [
        {
          statement : sql,
          values:[
            newrut,
            newnombre,
            newedad,
            newdireccion,
            newCorreo_Electronico,
            newtelefono,
            originalrut
          ]
        }
      ]
    }).then((changes : capSQLiteChanges)=>{
      if(this.isWeb){
        CapacitorSQLite.saveToStore({database: dbName})
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }

  async delete(rut : string){
    let sql = 'DELETE FROM alumnos WHERE rut=?'
    const dbName = await this.getDbName();
    return CapacitorSQLite.executeSet({
      database : dbName,
      set : [{
        statement : sql,
        values:[
          rut
        ]

      }]
    }).then((changes : capSQLiteChanges)=>{
      if(this.isWeb){
        CapacitorSQLite.saveToStore({database: dbName})
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }
}
