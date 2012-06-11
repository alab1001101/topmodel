#!/usr/bin/node

var app = require('http').createServer()
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    , util  = require('util')
    , spawn = require('child_process').spawn
    , top    = spawn('top', ['-b', '-d 1'])
    , topEmitter = new (require('events').EventEmitter)()
    , topData  = new Buffer(0)
    , topCommon = {}
    , topCols  = {}
    , topProcs = [];

function parseTop() {
    var common = true,
        cols   = false,
        procs  = false,
        offset = 0,
        result = {};

    topData = topData.slice(10 == topData[0] ? 2 : 0, topData.length - 1);

    for (var i=0; i < topData.length; i++) {
        if (10 == topData[i]) {
            if (procs) {
                parseTopProcs(offset, i);
                cols  = false;
                procs = true;
            }
            if (cols) {
                parseTopCols(offset, i);
                cols  = false;
                procs = true;
            }
            if (common) {
                parseTopCommon(offset, i);
            }
            if (10 == topData[i+1]) {
                common = false;
                cols   = true;
                i++;
            }
            offset = i+1;
        }
    }
    result = {
        common: [],
        cols: topCols,
        procs: topProcs
    };

    topData = new Buffer(0);
    topCommon = {};
    topCols  = {};
    topProcs = [];

    return result;
}

function parseTopCommon(start, end) {
    console.log('common ' + topData.slice(start, end));
}

function parseTopProcs(start, end) {
    var lines =  (''+topData.slice(start, end)).split('\n');
    for (var i = 0; i< lines.length; i++) {

        var cols = splitByWhitespace(lines[i]),
            row = {};

        for (var col in topCols) {
            row[col] = cols[topCols[col]];
        }

        topProcs.push(row);
    }
}

function parseTopCols(start, end) {
    var cols = splitByWhitespace(''+topData.slice(start, end));
    for (var i = 0; i< cols.length; i++) {
        topCols[cols[i]] = i;
    }
}

function splitByWhitespace(string) {
    return string.replace(/ +/g, ' ').replace(/^ | $/g, '').split(' ');
}

function copyTopData(data) {
    var l = topData.length,
        s = l + data.length,
        t = new Buffer(s);

    l && topData.copy(t, 0, 0);
    data.copy(t, l, 0);
    topData = t;
}

top.stdout.on('data', function (data) {
    copyTopData(data);
    if (10 == topData[topData.length - 1]) {
        topEmitter.emit('top', parseTop());
    }
});

app.listen(8080);

io.sockets.on('connection', function (socket) {
    topEmitter.on('top', function(data) {
        socket.emit('top', data);
    })
});
