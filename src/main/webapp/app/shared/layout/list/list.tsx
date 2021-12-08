import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Alert, Row, Spinner } from 'reactstrap';
import { IPaginationBaseState, JhiItemCount, JhiPagination } from 'react-jhipster/lib/src/component';

interface IListComponent<Data> {
  fetch?: () => void;
  data: Data[];
  ListItem: ({ data: Data, listItemActions: any }) => JSX.Element;
  FilterElement?: (props: any) => JSX.Element;
  pagination: IPaginationBaseState;
  totalItems: number;
  handlePagination: (currentPage: number) => void;
  ActionButton?: JSX.Element;
  title: string;
  loading: boolean;
  listItemActions?: any;
}

const UIListComponent = <Data extends unknown>(props: IListComponent<Data>) => {
  const { data, ListItem, FilterElement, ActionButton, pagination, listItemActions, handlePagination, loading } = props;
  useEffect(() => {
    props.fetch && props.fetch();
  }, [props.fetch]);

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center">
      <Row className="w-100 d-flex justify-content-between m-2">
        <h1>{props.title}</h1>
        {ActionButton && ActionButton}
      </Row>
      {FilterElement && <FilterElement />}
      {loading ? <Spinner />: <ListGroup className="mt-2 align-items-center">
        {data.length > 0 ? (
          data.map((item, index) => (
            <ListGroupItem key={index} className="d-flex flex-column justify-center align-items-center">
              <ListItem data={item} listItemActions={listItemActions}/>
            </ListGroupItem>
          ))
        ) : (
          <Alert color="danger">Brak danych.</Alert>
        )}
      </ListGroup>}
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
