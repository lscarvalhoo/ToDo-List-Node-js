import { openDb } from "./configDB.js";

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Atividade(id INTEGER PRIMARY KEY, nome TEXT, status bool)')
    })
}

export async function getAllActivities(request, response) {
    openDb().then(db => {
        db.all('SELECT * FROM Atividade')
            .then(res => {
                response.json({
                    res,
                })
            })
    })
}

export async function getActivity(request, response) {
    let id = request.body.id;
    openDb().then(db => {
        db.all('SELECT * FROM Atividade WHERE Id = ?', id)
            .then(res => {
                response.json({
                    res,
                })
            })
    })
}

export async function getAllIncompletesActivities(request, response) {
    openDb().then(db => {
        db.all('SELECT * FROM Atividade WHERE status = ?', false)
            .then(res => {
                response.json({
                    res,
                })
            })
    })
}

export async function getAllCompletesActivities(request, response) {
    openDb().then(db => {
        db.all('SELECT * FROM Atividade WHERE status = ?', true)
            .then(res => {
                response.json({
                    res,
                })
            })
    })
}

export async function insertActivity(request, response) {
    let atividade = request.body; 
    if (atividade.nome === null) {
        response.json({
            statusCode: 400 
        });
    } else {
        openDb().then(db => {
            db.run('INSERT INTO Atividade (nome, status) VALUES (?, ?)', [atividade.nome, false]);
        });

        response.json({
            statusCode: 200 
        });
    }
}

export async function updateActivity(request, response) {
    let id = request.body.id;
    let status = 1;
    openDb().then(db => {
        db.run('UPDATE Atividade  SET status = ? WHERE id = ?', status, id);
    })

    response.json({
        statusCode: 200 
    })
}

export async function deleteActivity(request, response) {
    let id = request.body.id;

    try {
        openDb().then(db => {
            db.run('DELETE FROM Atividade WHERE id = ?', id);
        })

        response.json({
            statusCode: 200 
        })
    } catch {
        response.json({
            statusCode: 550 
        })
    }
}
