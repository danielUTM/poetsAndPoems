const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const fs = require('fs');
const {
  parse
} = require('path');

app.use(express.static('static'),
  express.json(),
  fileupload());

// POET GET REQUESTS

// ALL POETS

app.get('/poets', function (req, resp) {
  const poets = require('./static/assets/json/poets.json');
  const output = {
    data: []
  };

  try {
    for (let i = 0; i < poets.length; i++) {
      output.data.push({
        id: poets[i].id,
        name: poets[i].name
      });
    }
    resp.writeHead(200, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(output));
  } catch (e) {
    resp.writeHead(500, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 500,
      error: e,
      message: 'Error when getting poets'
    }));
  }
});

app.get('/poets/details', function (req, resp) {
  const poets = require('./static/assets/json/poets.json');
  const poems = require('./static/assets/json/poems.json');

  const nameBool = req.query.name ? parse(req.query.name).name === 'true' : false;
  const bornBool = req.query.born ? parse(req.query.born).name === 'true' : false;
  const diedBool = req.query.died ? parse(req.query.died).name === 'true' : false;
  const ageBool = req.query.age ? parse(req.query.age).name === 'true' : false;
  const pobBool = req.query.pob ? parse(req.query.pob).name === 'true' : false;
  const movementBool = req.query.movement ? parse(req.query.movement).name === 'true' : false;
  const imageBool = req.query.image ? parse(req.query.image).name === 'true' : false;
  const poemsBool = req.query.poems ? parse(req.query.poems).name === 'true' : false;

  const output = {
    data: []
  };

  try {
    for (let i = 0; i < poets.length; i++) {
      output.data.push({
        id: poets[i].id
      });
      if (nameBool) {
        output.data[i].name = poets[i].name;
      }
      if (bornBool) {
        output.data[i].born = poets[i].born;
      }
      if (diedBool) {
        output.data[i].died = poets[i].died;
      }
      if (ageBool) {
        output.data[i].age = poets[i].age;
      }
      if (pobBool) {
        output.data[i].pob = poets[i].pob;
      }
      if (movementBool) {
        output.data[i].movement = poets[i].movement;
      }
      if (imageBool) {
        output.data[i].image = poets[i].image;
      }
      if (poemsBool) {
        output.data[i].poems = poems[i].poems;
      }
    }
    resp.writeHead(200, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(output));
  } catch (e) {
    resp.writeHead(500, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 500,
      error: e,
      message: 'Error when getting poets details'
    }));
  }
});

// SPECIFIC POETS

app.get('/poet/:poetId', function (req, resp) {
  const poets = require('./static/assets/json/poets.json');
  const poet = parseInt(req.params.poetId);

  const lastID = poets.length - 1;
  if (isNaN(poet) || typeof (poet) !== 'number' || poet > lastID) {
    resp.writeHead(404, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: '404',
      message: 'This poet id does not exist'
    }));
  } else {
    try {
      const output = {
        data: []
      };

      output.data.push({
        id: poets[poet].id,
        name: poets[poet].name
      });
      resp.writeHead(200, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify(output));
    } catch (e) {
      resp.writeHead(500, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify({
        status: 500,
        error: e,
        message: 'Error when getting poet ' + poet + ' data'
      }));
    }
  }
});

app.get('/poet/:poetId/details', function (req, resp) {
  const poet = parseInt(req.params.poetId);
  const poets = require('./static/assets/json/poets.json');
  const poems = require('./static/assets/json/poems.json');

  const lastID = poets.length - 1;
  if (isNaN(poet) || typeof (poet) !== 'number' || poet > lastID) {
    resp.writeHead(404, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: '404',
      message: 'This poet id does not exist'
    }));
  } else {
    try {
      const nameBool = req.query.name ? parse(req.query.name).name === 'true' : false;
      const bornBool = req.query.born ? parse(req.query.born).name === 'true' : false;
      const diedBool = req.query.died ? parse(req.query.died).name === 'true' : false;
      const ageBool = req.query.age ? parse(req.query.age).name === 'true' : false;
      const pobBool = req.query.pob ? parse(req.query.pob).name === 'true' : false;
      const movementBool = req.query.movement ? parse(req.query.movement).name === 'true' : false;
      const imageBool = req.query.image ? parse(req.query.image).name === 'true' : false;
      const poemsBool = req.query.poems ? parse(req.query.poems).name === 'true' : false;

      const output = {
        data: []
      };
      output.data.push({
        id: poets[poet].id
      });

      if (nameBool) {
        output.data[0].name = poets[poet].name;
      }
      if (bornBool) {
        output.data[0].born = poets[poet].born;
      }
      if (diedBool) {
        output.data[0].died = poets[poet].died;
      }
      if (ageBool) {
        output.data[0].age = poets[poet].age;
      }
      if (pobBool) {
        output.data[0].pob = poets[poet].pob;
      }
      if (movementBool) {
        output.data[0].movement = poets[poet].movement;
      }
      if (imageBool) {
        output.data[0].image = poets[poet].image;
      }
      if (poemsBool) {
        output.data[0].poems = poems[poet].poems;
      }
      resp.writeHead(200, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify(output));
    } catch (e) {
      resp.writeHead(500, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify({
        status: 500,
        error: e,
        message: 'Error when getting poet ' + poet + ' details'
      }));
    }
  }
});

// POEM GET REQUESTS

// ALL POEMS

app.get('/poems', function (req, resp) {
  const poems = require('./static/assets/json/poems.json');
  const output = {
    data: []
  };

  try {
    for (let i = 0; i < poems.length; i++) {
      for (let j = 0; j < poems[i].poems.length; j++) {
        output.data.push({
          id: poems[i].poems[j].id,
          title: poems[i].poems[j].title
        });
      }
    }
    resp.writeHead(200, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(output));
  } catch (e) {
    resp.writeHead(500, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 500,
      error: e,
      message: 'Error when getting poems'
    }));
  }
});

app.get('/poems/details', function (req, resp) {
  const poems = require('./static/assets/json/poems.json');
  const output = {
    data: []
  };

  const poetBool = req.query.poet ? parse(req.query.poet).name === 'true' : false;
  const titleBool = req.query.title ? parse(req.query.title).name === 'true' : false;
  const textBool = req.query.text ? parse(req.query.text).name === 'true' : false;

  try {
    for (let i = 0; i < poems.length; i++) {
      output.data.push(
        poetBool
          ? {
              poet_id: poems[i].poet_id,
              poet: poems[i].poet
            }
          : {
              poet_id: poems[i].poet_id
            });

      output.data[i].poems = [];
      for (let j = 0; j < poems[i].poems.length; j++) {
        output.data[i].poems.push({
          id: poems[i].poems[j].id
        });
        if (titleBool) {
          output.data[i].poems[j].title = poems[i].poems[j].title;
        }
        if (textBool) {
          output.data[i].poems[j].text = poems[i].poems[j].text;
        }
      }
    }
    resp.writeHead(200, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(output));
  } catch (e) {
    resp.writeHead(500, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 500,
      error: e,
      message: 'Error when getting poems details'
    }));
  }
});

// SPECIFIC POEMS

app.get('/poem/:poemId', function (req, resp) {
  const poems = require('./static/assets/json/poems.json');
  const poem = parseInt(req.params.poemId);
  const output = {
    data: []
  };

  const lastID = poems.length - 1;
  if (isNaN(poem) || typeof (poem) !== 'number' || poem > lastID) {
    resp.writeHead(404, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: '404',
      message: 'This poem id does not exist'
    }));
  } else {
    try {
      for (let i = 0; i < poems.length; i++) {
        for (let j = 0; j < poems[i].poems.length; j++) {
          if (poems[i].poems[j].id === poem) {
            output.data.push({
              id: poems[i].poems[j].id,
              title: poems[i].poems[j].title
            });
            break;
          }
        }
      }
      resp.writeHead(200, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify(output));
    } catch (e) {
      resp.writeHead(500, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify({
        status: 500,
        error: e,
        message: 'Error when getting poem ' + poem + ' data'
      }));
    }
  }
});

app.get('/poem/:poemId/details', function (req, resp) {
  const poems = require('./static/assets/json/poems.json');
  const poem = parseInt(req.params.poemId);
  const output = {
    data: []
  };

  const poetBool = req.query.poet ? parse(req.query.poet).name === 'true' : false;
  const titleBool = req.query.title ? parse(req.query.title).name === 'true' : false;
  const textBool = req.query.text ? parse(req.query.text).name === 'true' : false;

  const lastID = poems.length - 1;
  if (isNaN(poem) || typeof (poem) !== 'number' || poem > lastID) {
    resp.writeHead(404, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: '404',
      message: 'This poem id does not exist'
    }));
  } else {
    try {
      for (let i = 0; i < poems.length; i++) {
        for (let j = 0; j < poems[i].poems.length; j++) {
          if (poems[i].poems[j].id === poem) {
            output.data.push(
              poetBool
                ? {
                    poet_id: poems[i].poet_id,
                    poet: poems[i].poet
                  }
                : {
                    poet_id: poems[i].poet_id
                  });

            output.data[i].poems = [];
            output.data[i].poems.push({
              id: poems[i].poems[j].id
            });

            if (titleBool) {
              output.data[i].poems[j].title = poems[i].poems[j].title;
            }
            if (textBool) {
              output.data[i].poems[j].text = poems[i].poems[j].text;
            }

            break;
          }
        }
      }
      resp.writeHead(200, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify(output));
    } catch (e) {
      resp.writeHead(500, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify({
        status: 500,
        error: e,
        message: 'Error when getting poem ' + poem + ' details'
      }));
    }
  }
});

// POST REQUESTS

app.post('/saveimage', function (req, resp) {
  const image = req.files.inpFile;

  try {
    image.mv(req.body.new_img_name);
    resp.writeHead(200, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 'success',
      path: req.body.new_img_name
    }));
  } catch (e) {
    resp.writeHead(500, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 500,
      error: e,
      message: 'Error when uploading image'
    }));
  }
});

app.post('/poet/add', function (req, resp) {
  const poets = require('./static/assets/json/poets.json');
  const poems = require('./static/assets/json/poems.json');

  try {
    poets.push(req.body);
    fs.writeFile('./static/assets/json/poets.json', JSON.stringify(poets), function (e) {
      if (e) {
        resp.writeHead(500, {
          'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
          status: 500,
          error: e,
          message: 'Error when writing to poets.json file'
        }));
      }
    });

    poems.push({
      poet_id: req.body.id,
      poet: req.body.name,
      poems: []
    });
    fs.writeFile('./static/assets/json/poems.json', JSON.stringify(poems), function (e) {
      if (e) {
        resp.writeHead(500, {
          'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
          status: 500,
          error: e,
          message: 'Error when writing to poems.json file'
        }));
      }
      resp.writeHead(200, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify({
        status: 'success',
        message: 'Added new poet'
      }));
    });
  } catch (e) {
    resp.writeHead(500, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 500,
      error: e,
      message: 'Error when trying to add new poet'
    }));
  }
});

app.post('/poem/add', function (req, resp) {
  const poems = require('./static/assets/json/poems.json');

  try {
    for (let i = 0; i < poems.length; i++) {
      if (poems[i].poet_id === req.body.poet_id) {
        poems[i].poems.push({
          id: req.body.id,
          title: req.body.title,
          text: req.body.text
        });
        break;
      }
    }

    fs.writeFile('./static/assets/json/poems.json', JSON.stringify(poems), function (e) {
      if (e) {
        resp.writeHead(500, {
          'Content-Type': 'application/json'
        });
        resp.end(JSON.stringify({
          status: 500,
          error: e,
          message: 'Error when writing to poems.json file'
        }));
      }
      resp.writeHead(200, {
        'Content-Type': 'application/json'
      });
      resp.end(JSON.stringify({
        status: 'success',
        message: 'Added new poem'
      }));
    });
  } catch (e) {
    resp.writeHead(500, {
      'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
      status: 500,
      error: e,
      message: 'Error when trying to add new poem'
    }));
  }
});

// INCORRECT URL

app.use(function (req, resp) {
  resp.writeHead(404, {
    'Content-Type': 'application/json'
  });
  resp.end(JSON.stringify({
    status: '404',
    message: 'This URL does not exist'
  }));
});

module.exports = app;
