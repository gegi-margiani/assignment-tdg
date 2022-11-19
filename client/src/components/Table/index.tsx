import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { usePeopleStore } from '../../stores/people';
import { Person } from '../../types/people';
import Modal from '../Modal';
import {
  StyledAddButton,
  StyledDeleteButton,
} from '../Styled Components/Buttons.styled';

function Table() {
  const [pending, setPending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [person, setPerson] = useState({});

  const people = usePeopleStore((state) => state.people);
  const removePerson = usePeopleStore((state) => state.removePerson);

  const columns: TableColumn<Person>[] = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: 'Street',
      selector: (row) => row.address.street,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row) => row.address.city,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      cell: (row) => (
        <StyledDeleteButton
          onClick={async (e) => {
            e.preventDefault();
            const response = await axios.delete(`/people/person/${row.id}`);
            if (response.data === 'Person deleted') {
              removePerson(row);
            }
          }}
        >
          Delete
        </StyledDeleteButton>
      ),
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const toggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div style={{ userSelect: 'none' }}>
      <DataTable
        title="People Info List"
        columns={columns}
        data={people}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
        progressPending={pending}
        onRowDoubleClicked={(row, e) => {
          setPerson(row);
          setIsAdd(false);
          setIsUpdate(true);
          toggle();
        }}
        actions={
          <StyledAddButton
            onClick={() => {
              setIsAdd(true);
              setIsUpdate(false);
              toggle();
            }}
          >
            Add Person
          </StyledAddButton>
        }
      />
      <Modal
        isOpen={isModalOpen}
        toggle={toggle}
        isAdd={isAdd}
        isUpdate={isUpdate}
        person={person}
      />
    </div>
  );
}

export default Table;
