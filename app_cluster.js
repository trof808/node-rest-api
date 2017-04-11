const cluster = require('cluster');
const CPUs = require('os').cpus();

const startWorker = () => {
    const worker = cluster.fork();
    console.log('КЛАСТЕР: испольнитель ' + worker.id + ' запущен');
};

if(cluster.isMaster) {
    CPUs.forEach(() => {
        startWorker();
    });

    cluster.on('disconnect', (worker) => {
        console.log('КЛАСТЕР: исполнитель ' + worker.id + ' отключился от сервера');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('КЛАСТЕР: исполнитель ' + worker.id + ' завершил работу с кодом выполнения ' + code + ' ' + signal);
        startWorker();
    });
} else {
    require('./app')();
}
