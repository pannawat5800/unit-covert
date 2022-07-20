import request from 'supertest';
import app from '../../src/index';

describe('POST /system/convert', () => {
    it('Should get covert is the same value', async () => {
        const response = await request(app).post('/systems/convert').send({
            "value": 1,
            "from": "acre",
            "to": "acre"
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({ value: 1, unit: "acre"})
    })
    
})