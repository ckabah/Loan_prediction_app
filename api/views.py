from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoanSerializer
import pickle5 as pickle
import pandas as pd

model_path = 'ml_models/rf_model.sav'
model = pickle.load(open(model_path, 'rb'))
result = ''

@csrf_exempt
@api_view(['GET', 'POST'])
def loan_prediction(request):
    if request.method == 'GET':
        serializer = LoanSerializer(many = True)
        return Response(serializer.data)

    elif request.method =='POST':
        serializer = LoanSerializer(data=request.data)
        print(type(request.data['loan_amount']))
        if serializer.is_valid():
            # get request data.
            gender = request.data['gender']
            married = request.data['married']
            education = request.data['education']
            dependents = request.data['dependents']
            self_employment = request.data['self_employment']
            property_area = request.data['property_area']
            applicant_income = request.data['applicant_income']
            loan_amount = request.data['loan_amount']
            coapplicant_income = request.data['coapplicant_income']
            loan_amount_term = request.data['loan_amount_term']
            credit_history = request.data['credit_history']

            # create a dictionair to request data and create pandas data frame
            input = dict()
            input['Gender'] = gender
            input['Married'] = married
            input['Education'] = education
            input['Dependents'] = dependents
            input['Self_Employed'] = self_employment
            input['Property_Area'] = property_area
            input['ApplicantIncome'] = applicant_income
            input['LoanAmount'] = loan_amount
            input['CoapplicantIncome'] = coapplicant_income
            input['Loan_Amount_Term'] = loan_amount_term
            input['Credit_History'] = credit_history
            
            # use exactly trainset columns names, beceause we use the sckit-learn columm transformer. 
            columns = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed',
                        'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount',
                        'Loan_Amount_Term', 'Credit_History', 'Property_Area']
            # temporary data frame for model.
            temp_df = pd.DataFrame(data = input, columns = columns, index =[1])
            #get model predict result.
            result =  int(model.predict(temp_df)[0])
            #return data for react frontend.
            return Response({'input': input, 'result':result})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
