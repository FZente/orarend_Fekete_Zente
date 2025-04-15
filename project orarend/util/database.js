import sqlite from 'sqlite3'

const db = new sqlite.Database('./data/database.sqlite')

export function dbAll(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.all(sql, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbGet(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.get(sql, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbRun(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.run(sql, params, function(err) {
            if(err) reject(err);
            else resolve();
        });
    });
}

export async function initializeDB(){
    await dbRun("DROP TABLE IF EXISTS orak;");
    await dbRun("CREATE TABLE IF NOT EXISTS orak (id INTEGER PRIMARY KEY AUTOINCREMENT, elso STRING, masodik STRING, harmadik STRING, negyedik STRING, otodik STRING, hatodik STRING, hetedik STRING, nyolcadik STRING);")
        const orak = [
            {elso: "Matek", masodik: "Angol", harmadik: "Német", negyedik: "Történelem", otodik: "Testnevelés", hatodik: "Rajz", hetedik: "", nyolcadik: "" },
            {elso: "PHP", masodik: "Javascript", harmadik: "Német", negyedik: "IKT", otodik: "Nyelvtan", hatodik: "Szakang", hetedik: "", nyolcadik: "" },
            {elso: "Fizika", masodik: "Angol", harmadik: "Német", negyedik: "Matek", otodik: "Történelem", hatodik: "", hetedik: "", nyolcadik: ""} ,
            {elso: "Történelem", masodik: "Irodalom", harmadik: "Matek", negyedik: "Szakang", otodik: "Német", hatodik: "Angol", hetedik: "Tesztelés", nyolcadik: "Tesztelés" },
            {elso: "Államp.", masodik: "Történelem", harmadik: "Irodalom", negyedik: "Webprog", otodik: "Testnevelés", hatodik: "Angol", hetedik: "Fejlesztés", nyolcadik: "" },
        ]
    for(const ora of orak){
        await dbRun("INSERT INTO orak (elso, masodik, harmadik, negyedik, otodik, hatodik, hetedik, nyolcadik) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [ora.elso, ora.masodik, ora.harmadik, ora.negyedik, ora.otodik, ora.hatodik, ora.hetedik, ora.nyolcadik,]);
    }
}