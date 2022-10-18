import json
from urllib import response
from django.test import TestCase
from django.urls import reverse

class ApiTest(TestCase):

    def test_view_url_existe(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
    
    def test_veiw_url_accessible_by_name(self):
        response = self.client.get(reverse('loan_prediction'))
        self.assertEqual(response.status_code, 200)
    
    def test_veiw_url_post_data(self):
        response = self.client.post('/', data= {
            'gender' : 1 ,
            'married' : 0 ,
            'education' : 0 ,
            'dependents' : 3,
            'self_employment': 1,
            'property_area' :2,
            'applicant_income' : 1000,
            'loan_amount' : 8000,
            'coapplicant_income':1200,
            'loan_amount_term' : 3000,
            'credit_history' : 1,
        })
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['result'] == 0 or 1)