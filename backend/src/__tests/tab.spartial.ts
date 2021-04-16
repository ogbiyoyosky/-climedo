import request from "supertest";
import app from "../app";
const makeRequest = request(app);
import TabModel from "../models/Tab";

let tabId 
export default () => {
  describe("Tab Management", () => {
    test("should create a tab", async (done) => {
      const res: any = await makeRequest.post("/tabs").send({
        "name" : "Disease history 2",
        "description" : "The chronic of the disease at hand", 
        "dataPoints" : [{
             "dataType" : "selection",
             "label" : "ECOG_SCORE",
             "description" : "ECOC score at the start of IO", 
             "options": ["0","1","2","3","4","5","unknown"]
             },
             {
                "dataType" : "text",
                "label" : "ECOG_HB_LEVEL",
                "placeholder" : "g/dL",
                "description" : "Hemogolobin level at the start of IO (g/dL)"
             }]
        });
  
        tabId = res.body.data._id
      expect((res as any).status).toBe(201);
      done();
    });

    test("should fetch all tabs", async (done) => {
      const res: any = await makeRequest.get("/tabs")
      expect((res as any).status).toBe(200);
      done();
    });
    
    test("should update a tab", async (done) => {
      const res: any = await makeRequest.put(`/tabs/${tabId}`).send({
        "name" : "Disease history 2",
        "description" : "THE CHRONIC DISEASE", 
        "dataPoints" : [{
             "dataType" : "selection",
             "label" : "ECOG_SCORE",
             "description" : "ECOC score at the start of IO", 
             "options": ["0","1","2","3","4","5","unknown"]
             },
             {
                "dataType" : "text",
                "label" : "ECOG_HB_LEVEL",
                "placeholder" : "g/dL",
                "description" : "Hemogolobin level at the start of IO (g/dL)"
             }]
        });
      expect((res as any).status).toBe(200);
      done();
    });


    test("should update a tab", async (done) => {
      const res: any = await makeRequest.delete(`/tabs/${tabId}`)
      expect((res as any).status).toBe(200);
      done();
    });
    
  });


};
