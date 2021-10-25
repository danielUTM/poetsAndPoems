const app = require("./app");
const request = require("supertest");
const fs = require("fs");

describe("Test GET Poets request", () => {

    test("GET poets returns JSON", () => {
        return request(app)
        .get("/poets")
        .expect("Content-type", /json/);
    });

    test("GET poets succeeds", () => {
        return request(app)
	    .get("/poets")
	    .expect(200);
    });

    test("GET poets returns id", () => {
        return request(app)
	    .get("/poets")
	    .expect(/"id":[0-9]/);
    });

    test("GET poets returns name", () => {
        return request(app)
	    .get("/poets")
	    .expect(/"name":"([\w\s]+)"/);
    });
});

describe("Test GET Poets details request", () => {

    test("GET poets (default fields) returns JSON", () => {
        return request(app)
        .get("/poets/details")
        .expect("Content-type", /json/);
    });

    test("GET poets (optional fields) returns JSON", () => {
        return request(app)
        .get("/poets/details?name=true&born=true&died=true&age=true&pob=true&movement=true&image=true&poems=true")
        .expect("Content-type", /json/);
    });

    test("GET poets (default fields) succeeds", () => {
        return request(app)
	    .get("/poets/details")
	    .expect(200);
    });

    test("GET poets (optional fields) succeeds", () => {
        return request(app)
	    .get("/poets/details?name=true&born=true&died=true&age=true&pob=true&movement=true&image=true&poems=true")
	    .expect(200);
    });

    test("GET poets returns id", () => {
        return request(app)
	    .get("/poets/details")
	    .expect(/"id":[0-9]/);
    });

    test("GET poets returns name", () => {
        return request(app)
	    .get("/poets/details?name=true")
	    .expect(/"name":"([\w\s]+)"/);
    });

    test("GET poets returns date of birth", () => {
        return request(app)
	    .get("/poets/details?born=true")
	    .expect(/"born":"([\w\s]+)"/);
    });

    test("GET poets returns date of death", () => {
        return request(app)
	    .get("/poets/details?died=true")
	    .expect(/"died":"([\w\s]+)"/);
    });

    test("GET poets returns age", () => {
        return request(app)
	    .get("/poets/details?age=true")
	    .expect(/"age":([0-9]+)/);
    });

    test("GET poets returns pob", () => {
        return request(app)
	    .get("/poets/details?pob=true")
	    .expect(/"pob":"([\w\s]+), ([\w\s]+)"/);
    });

    test("GET poets returns movement", () => {
        return request(app)
	    .get("/poets/details?movement=true")
	    .expect(/"movement":"([\w\s]+)"/);
    });

    test("GET poets returns image", () => {
        return request(app)
	    .get("/poets/details?image=true")
	    .expect(/"image":".\/assets\/images\/([\w\s]+).([\w\s]+)"/);
    });

    test("GET poets returns poems", () => {
        return request(app)
	    .get("/poets/details?poems=true")
	    .expect(/"poems":\[\{"id":[0-9],"title":"([\w\s]+)","text":"([\w\s])/);
    });
});

describe("Test GET Poet request", () => {

    test("GET Poet returns JSON", () => {
        return request(app)
        .get("/poet/0")
        .expect("Content-type", /json/);
    });

    test("GET Poet succeeds", () => {
        return request(app)
	    .get("/poet/0")
	    .expect(200);
    });

    test("GET Poet doesn't find ID", () => {
        return request(app)
	    .get("/poet/this_is_not_an_id")
	    .expect(404);
    });

    test("GET Poet returns id", () => {
        return request(app)
	    .get("/poet/0")
	    .expect(/"id":[0-9]/);
    });

    test("GET Poet returns name", () => {
        return request(app)
	    .get("/poet/0")
	    .expect(/"name":"([\w\s]+)"/);
    });
});

describe("Test GET Poet details request", () => {

    test("GET Poet details (default fields) returns JSON", () => {
        return request(app)
        .get("/poet/0/details")
        .expect("Content-type", /json/);
    });

    test("GET Poet details (optional fields) returns JSON", () => {
        return request(app)
        .get("/poet/0/details?name=true&born=true&died=true&age=true&pob=true&movement=true&image=true&poems=true")
        .expect("Content-type", /json/);
    });

    test("GET Poet details (default fields) succeeds", () => {
        return request(app)
	    .get("/poet/0/details")
	    .expect(200);
    });

    test("GET Poet details (optional fields) succeeds", () => {
        return request(app)
	    .get("/poet/0/details?name=true&born=true&died=true&age=true&pob=true&movement=true&image=true&poems=true")
	    .expect(200);
    });

    test("GET Poet details doesn't find ID", () => {
        return request(app)
	    .get("/poet/this_is_not_an_id/details")
	    .expect(404);
    });

    test("GET Poet details returns id", () => {
        return request(app)
	    .get("/poet/0/details")
	    .expect(/"id":[0-9]/);
    });

    test("GET Poet details returns name", () => {
        return request(app)
	    .get("/poet/0/details?name=true")
	    .expect(/"name":"([\w\s]+)"/);
    });

    test("GET Poet details returns date of birth", () => {
        return request(app)
	    .get("/poet/0/details?born=true")
	    .expect(/"born":"([\w\s]+)"/);
    });

    test("GET Poet details returns date of death", () => {
        return request(app)
	    .get("/poet/0/details?died=true")
	    .expect(/"died":"([\w\s]+)"/);
    });

    test("GET Poet details returns age", () => {
        return request(app)
	    .get("/poet/0/details?age=true")
	    .expect(/"age":([0-9]+)/);
    });

    test("GET Poet details returns pob", () => {
        return request(app)
	    .get("/poet/0/details?pob=true")
	    .expect(/"pob":"([\w\-\s]+), ([\w\s]+)"/);
    });

    test("GET Poet details returns movement", () => {
        return request(app)
	    .get("/poet/0/details?movement=true")
	    .expect(/"movement":"([\w\s]+)"/);
    });

    test("GET Poet details returns image", () => {
        return request(app)
	    .get("/poet/0/details?image=true")
	    .expect(/"image":".\/assets\/images\/([\w\s]+).([\w\s]+)"/);
    });

    test("GET Poet details returns poems", () => {
        return request(app)
	    .get("/poet/0/details?poems=true")
	    .expect(/"poems":\[\{"id":[0-9],"title":"([\w\s]+)","text":"([\w\s])/);
    });
});

describe("Test GET Poems request", () => {

    test("GET Poems returns JSON", () => {
        return request(app)
        .get("/poems")
        .expect("Content-type", /json/);
    });

    test("GET Poems succeeds", () => {
        return request(app)
	    .get("/poems")
	    .expect(200);
    });

    test("GET Poems returns id", () => {
        return request(app)
	    .get("/poems")
	    .expect(/"id":[0-9]/);
    });

    test("GET Poems returns title", () => {
        return request(app)
	    .get("/poems")
	    .expect(/"title":"([\w\s]+)/);
    });
});

describe("Test GET Poems details request", () => {

    test("GET Poems details (default fields) returns JSON", () => {
        return request(app)
        .get("/poems/details")
        .expect("Content-type", /json/);
    });

    test("GET Poems details (optional fields) returns JSON", () => {
        return request(app)
        .get("/poems/details?poet=true&title=true&text=true")
        .expect("Content-type", /json/);
    });

    test("GET Poems details (default fields) succeeds", () => {
        return request(app)
	    .get("/poems/details")
	    .expect(200);
    });

    test("GET Poems details (optional fields) succeeds", () => {
        return request(app)
        .get("/poems/details?poet=true&title=true&text=true")
        .expect("Content-type", /json/);
    });

    test("GET Poems details returns poet id", () => {
        return request(app)
	    .get("/poems/details")
	    .expect(/"poet_id":[0-9]/);
    });

    test("GET Poems details returns poem array with poem id", () => {
        return request(app)
	    .get("/poems/details")
	    .expect(/"poems":\[\{"id":[0-9]\}/)
    });

    test("GET Poems details returns poet name", () => {
        return request(app)
	    .get("/poems/details?poet=true")
	    .expect(/"poet":"([\w\s]+)"/);
    });

    test("GET Poems details returns poem array with poem title", () => {
        return request(app)
	    .get("/poems/details?title=true")
	    .expect(/"poems":\[\{"id":[0-9],"title":"([\w\s]+)"\}/)
    });

    test("GET Poems details returns poem array with poem text", () => {
        return request(app)
	    .get("/poems/details?text=true")
	    .expect(/"poems":\[\{"id":[0-9],"text":"([\w\s])/)
    });
});

describe("Test GET Poem request", () => {

    test("GET Poem returns JSON", () => {
        return request(app)
        .get("/poem/0")
        .expect("Content-type", /json/);
    });

    test("GET Poems succeeds", () => {
        return request(app)
	    .get("/poem/0")
	    .expect(200);
    });

    test("GET Poems doesn't find ID", () => {
        return request(app)
	    .get("/poem/this_is_not_an_id/details")
	    .expect(404);
    });

    test("GET Poems returns id", () => {
        return request(app)
	    .get("/poem/0")
	    .expect(/"id":[0-9]/);
    });

    test("GET Poems returns title", () => {
        return request(app)
	    .get("/poem/0")
	    .expect(/"title":"([\w\s]+)/);
    });
});

describe("Test GET Poem details request", () => {

    test("GET Poem details (default fields) returns JSON", () => {
        return request(app)
        .get("/poem/0/details")
        .expect("Content-type", /json/);
    });

    test("GET Poem details (optional fields) returns JSON", () => {
        return request(app)
        .get("/poem/0/details?poet=true&title=true&text=true")
        .expect("Content-type", /json/);
    });

    test("GET Poem details (default fields) succeeds", () => {
        return request(app)
	    .get("/poem/0/details")
	    .expect(200);
    });

    test("GET Poem details (optional fields) succeeds", () => {
        return request(app)
        .get("/poem/0/details?poet=true&title=true&text=true")
        .expect("Content-type", /json/);
    });

    test("GET Poem details (optional fields) succeeds", () => {
        return request(app)
        .get("/poem/0/details?poet=true&title=true&text=true")
        .expect("Content-type", /json/);
    });

    test("GET Poem details doesn't find ID", () => {
        return request(app)
        .get("/poem/this_is_not_an_id/details?poet=true&title=true&text=true")
        .expect("Content-type", /json/);
    });

    test("GET Poems details returns poet id", () => {
        return request(app)
	    .get("/poem/0/details")
	    .expect(/"poet_id":[0-9]/);
    });

    test("GET Poems details returns poem array with poem id", () => {
        return request(app)
	    .get("/poem/0/details")
	    .expect(/"poems":\[\{"id":[0-9]\}/)
    });

    test("GET Poems details returns poet name", () => {
        return request(app)
	    .get("/poem/0/details?poet=true")
	    .expect(/"poet":"([\w\s]+)"/);
    });

    test("GET Poems details returns poem array with poem title", () => {
        return request(app)
	    .get("/poem/0/details?title=true")
	    .expect(/"poems":\[\{"id":[0-9],"title":"([\w\s]+)"\}/)
    });

    test("GET Poems details returns poem array with poem text", () => {
        return request(app)
	    .get("/poem/0/details?text=true")
	    .expect(/"poems":\[\{"id":[0-9],"text":"([\w\s])/)
    });
});

describe("Test POST Save image", () => {

    test("POST Save image succeeds", () => {
        return request(app)
        .post("/saveimage")
        .set("Content-Type", "multipart/form-data")
                .field("new_img_name", "./static/assets/images/test/test.jpg")
                .attach("inpFile", fs.readFileSync("./static/assets/images/William Shakespeare.jpg"))
                .expect(200).expect("Content-Type", /json/);
    });
    
});

describe("Test POST Add poet", () => {

    test("POST Add poet succeeds", () => {

        return request(app)
        .post("/poet/add")
        .set("Content-Type", "application/json")
        .expect(200).expect("Content-Type", /json/);
    });
    
});

describe("Test POST Add poem", () => {

    test("POST Add poet succeeds", () => {

        return request(app)
        .post("/poem/add")
        .set("Content-Type", "application/json")
        .expect(200).expect("Content-Type", /json/);
    });
    
});

