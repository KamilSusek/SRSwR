import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Alert, Row } from 'reactstrap';
import { IPaginationBaseState, JhiItemCount, JhiPagination } from 'react-jhipster/lib/src/component';

interface IListComponent<Data> {
  fetch?: () => void;
  data: Data[];
  ListItem: ({ data: Data }) => JSX.Element;
  FilterElement?: (props: any) => JSX.Element;
  pagination: IPaginationBaseState;
  totalItems: number;
  handlePagination: (currentPage: number) => void;
}

const UIListComponent = <Data extends unknown>(props: IListComponent<Data>) => {
  const { data, ListItem, FilterElement, pagination, handlePagination } = props;
  useEffect(() => {
    props.fetch();
  }, []);

  return (
    <Container fluid className="d-flex flex-column justify-content-center w-100">
      {FilterElement && <FilterElement />}
      <ListGroup className="mt-2">
        {data.length > 0 ? (
          data.map((item, index) => (
            <ListGroupItem key={index}>
              <ListItem data={item} />
            </ListGroupItem>
          ))
        ) : (
          <Alert color="danger">Brak danych.</Alert>
        )}
      </ListGroup>
      {props.totalItems ? (
        <div className={data && data.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={pagination.activePage} total={props.totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </Container>
  );
};

export default UIListComponent;
