from django import forms

from help_docs.models import Document


class LoginForm(forms.ModelForm):
    username = forms.CharField(required=True, max_length=50, label='Username',
                               widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(required=True, max_length=50, label='Password',
                               widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        fields = ['username', 'password']


class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        fields = ('document', )

