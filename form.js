import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  TouchablewithoutFeedback,
  keyboard,
  Text,
  View,
  Form,
  Switch,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Formik } from 'formik';
import * as yup from 'yup';
const api = () => {
  
  Actions.dd()
};


const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);
const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3,
    
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }
 

    return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};



const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

const validationSchema = yup.object().shape({
 
    

    firstName : yup
    .string()
    .label('First Name')
    .required(),
    
    lastName : yup
    .string()
    .label('Last Name')
    .required(),

    email: yup
    .string()
    .label('Email')
    .email()
    .required(),

  password: yup
    .string()
    .label('Password')
    .required()
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ', function(value) {
      return this.parent.password === value;
    }),

});    


const Demo =() => (
  
  <ScrollView>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        
        agreeToTerms: false,
      }}
      onSubmit={(values, actions) => {
       
            Actions.dd()
            setTimeout(() => {
                actions.setSubmitting(false);
              });
       
      }}
      validationSchema={validationSchema}   >
      {formikProps => (
        <React.Fragment>
          <ScrollView>
<StyledInput
            label="First Name"
            formikProps={formikProps}
            formikKey="firstName"
            placeholder="first name"
         
          />
          <StyledInput
            label="Last Name"
            formikProps={formikProps}
            formikKey="lastName"
            placeholder="last name"
         
          />

          <StyledInput
            label="Email"
            formikProps={formikProps}
            formikKey="email"
            placeholder="react@gmail.com"
            autoFocus
        
          />

          <StyledInput
            label="Password"
            formikProps={formikProps}
            formikKey="password"
            placeholder="password"
            secureTextEntry
          />

          <StyledInput
            label="Confirm Password"
            formikProps={formikProps}
            formikKey="confirmPassword"
            placeholder="confirm password"
            secureTextEntry

          />

          

          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
           
        
        
            <Button  title="Sign-Up" onPress={formikProps.handleSubmit}  />
            
          )
          }

          <Text>        </Text>
        
          
           {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
           
        
        
            <Button title="Cancel"   onPress = { api } />
            
          )
          }   

                      
</ScrollView>
          
        </React.Fragment>
      )}
    </Formik>
    
  </ScrollView>
  
);

export default Demo;
