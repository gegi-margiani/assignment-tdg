import axios from 'axios';
import React, { useRef, useState } from 'react';
import { usePeopleStore } from '../../stores/people';
import { Person } from '../../types/people';
import { StyledAddButton } from '../Styled Components/Buttons.styled';
import { StyledForm } from './Form.styled';

type Props = {
  isAdd: boolean;
  isUpdate: boolean;
  person: Person | any;
};

function Form({ isAdd, isUpdate, person }: Props) {
  const [validationError, setValidationError] = useState('');

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  const addPerson = usePeopleStore((state) => state.addPerson);
  const updatePerson = usePeopleStore((state) => state.updatePerson);

  const validate = (): boolean => {
    if (!firstNameRef.current?.value) {
      setValidationError('First name is required');
      return false;
    } else if (!lastNameRef.current?.value) {
      setValidationError('Last name is required');
      return false;
    } else if (genderRef.current?.value === 'Gender') {
      setValidationError('Gender is required');
      return false;
    } else if (!streetRef.current?.value) {
      setValidationError('Street is required');
      return false;
    } else if (!cityRef.current?.value) {
      setValidationError('City is required');
      return false;
    } else if (!emailRef.current?.value) {
      setValidationError('Email is required');
      return false;
    } else if (
      !emailRef.current?.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setValidationError('Email is not valid');
      return false;
    } else if (!phoneRef.current?.value) {
      setValidationError('Phone number is required');
      return false;
    }
    return true;
  };

  const handleAddPerson = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      const body = {
        name: `${firstNameRef.current?.value} ${lastNameRef.current?.value}`,
        email: emailRef.current?.value,
        gender: genderRef.current?.value.toLowerCase(),
        address: {
          street: streetRef.current?.value,
          city: cityRef.current?.value,
        },
        phone: phoneRef.current?.value,
      };
      const response = await axios.post('/people/person', body, {
        headers: { 'Content-Type': 'application/json' },
      });
      const newPerson: Person = response.data;
      if (newPerson) {
        addPerson(newPerson);
      }
    }
  };

  const handleUpdatePerson = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      const body = {
        name: `${firstNameRef.current?.value} ${lastNameRef.current?.value}`,
        email: emailRef.current?.value,
        gender: genderRef.current?.value.toLowerCase(),
        address: {
          street: streetRef.current?.value,
          city: cityRef.current?.value,
        },
        phone: phoneRef.current?.value,
      };
      const response = await axios.put(`/people/person/${person.id}`, body, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data === 'Person updated') {
        updatePerson({ id: person.id, ...(body as Omit<Person, 'id'>) });
      }
    }
  };
  return (
    <>
      <StyledForm>
        <div>
          <label htmlFor="first_name">First Name*: </label>
          <input
            id="first_name"
            type="text"
            ref={firstNameRef}
            defaultValue={isUpdate ? person.name.split(' ')[0] : null}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name*: </label>
          <input
            id="last_name"
            type="text"
            ref={lastNameRef}
            defaultValue={isUpdate ? person.name.split(' ')[1] : null}
          />
        </div>
        <select
          ref={genderRef}
          defaultValue={isUpdate ? person.gender : 'Gender'}
        >
          <option value="Gender">Gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <div>
          <label htmlFor="street">Street*: </label>
          <input
            id="street"
            type="text"
            ref={streetRef}
            defaultValue={isUpdate ? person.address.street : null}
          />
        </div>
        <div>
          <label htmlFor="city">City*: </label>
          <input
            id="city"
            type="text"
            ref={cityRef}
            defaultValue={isUpdate ? person.address.city : null}
          />
        </div>
        <div>
          <label htmlFor="email">Email*: </label>
          <input
            id="email"
            type="text"
            ref={emailRef}
            defaultValue={isUpdate ? person.email : null}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone*: </label>
          <input
            id="phone"
            type="text"
            ref={phoneRef}
            defaultValue={isUpdate ? person.phone : null}
          />
        </div>
        {validationError && <div>{validationError}</div>}
        <StyledAddButton
          onClick={
            isAdd ? handleAddPerson : isUpdate ? handleUpdatePerson : undefined
          }
        >
          {isAdd ? 'Add' : isUpdate ? 'Update' : undefined}
        </StyledAddButton>
      </StyledForm>
    </>
  );
}

export default Form;
