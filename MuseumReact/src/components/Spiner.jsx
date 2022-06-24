import React from 'react';
import {Button} from 'react-bootstrap';

class Spinner extends React.Component{
    render() {
        return (
            <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        )
    }
}

export default Spinner;