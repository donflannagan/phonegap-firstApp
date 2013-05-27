function opendDB() {
    db = window.openDatabase("repodb","0.1","GitHub Repo Db", 1000);
    db.transaction(createDb, txError, txSuccess);   
}

function createDb(tx) {
    tx.executeSql("DROP TABLE IF EXISTS repos");
    tx.executeSql("CREATE TABLE repos(user,name)");
}

function txError(error) {
    console.log(error);
    console.log("Database error: " + error);
}

function txSuccess() {
    console.log("Success");
}