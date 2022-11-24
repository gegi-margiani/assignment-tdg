import { Col, Row, Table as DataTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
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

  const columns: ColumnsType<Person> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        compare: (a, b) => a.email.localeCompare(b.email),
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: {
        compare: (a, b) => a.gender.localeCompare(b.gender),
      },
    },
    {
      title: 'Street',
      dataIndex: ['address', 'street'],
      key: 'street',
      sorter: {
        compare: (a, b) => a.address.street.localeCompare(b.address.street),
      },
    },
    {
      title: 'City',
      dataIndex: ['address', 'city'],
      key: 'city',
      sorter: {
        compare: (a, b) => a.address.city.localeCompare(b.address.city),
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: {
        compare: (a, b) => a.phone.localeCompare(b.phone),
      },
    },
    {
      key: 'operation',
      render: (row: any) => {
        return (
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
        );
      },
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
    <div>
      <DataTable
        columns={columns}
        dataSource={people}
        loading={pending}
        rowKey="id"
        title={() => {
          return (
            <Row>
              <Col span={22}>
                <span>People List</span>
              </Col>
              <Col span={2} flex="auto">
                <StyledAddButton
                  onClick={() => {
                    setIsAdd(true);
                    setIsUpdate(false);
                    toggle();
                  }}
                >
                  Add Person
                </StyledAddButton>
              </Col>
            </Row>
          );
        }}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (e) => {
              setPerson(record);
              setIsAdd(false);
              setIsUpdate(true);
              toggle();
            },
            onMouseEnter: (e) => {
              document.body.style.cursor = 'pointer';
            },
            onMouseLeave: (e) => {
              document.body.style.cursor = 'default';
            },
          };
        }}
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
