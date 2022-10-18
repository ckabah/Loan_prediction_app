from rest_framework import serializers

class LoanSerializer(serializers.Serializer):
    
    gender = serializers.ChoiceField(choices=(1, 0))
    married = serializers.ChoiceField(choices=(1, 0))
    education = serializers.ChoiceField(choices=(1, 0))
    dependents = serializers.ChoiceField(choices= (0, 1, 2, 3))
    self_employment = serializers.ChoiceField(choices=(1, 0) )
    property_area = serializers.ChoiceField(choices=(0, 1, 2))
    applicant_income = serializers.DecimalField(max_digits=12, decimal_places=0)
    loan_amount = serializers.DecimalField(max_digits=12, decimal_places=0)
    coapplicant_income = serializers.DecimalField(max_digits=12, decimal_places=0)
    loan_amount_term = serializers.DecimalField(max_digits=4, decimal_places=0)
    credit_history = serializers.DecimalField(max_digits=1, decimal_places=0)