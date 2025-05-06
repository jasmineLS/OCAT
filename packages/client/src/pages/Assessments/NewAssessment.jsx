import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

export const NewAssessment = () => {
  const { control, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group controlId="catName">
            <Form.Label>Cat Name</Form.Label>
            <Controller
              name="catName"
              control={control}
              rules={{ required: `Cat name is required` }}
              render={({ field }) => <Form.Control {...field} />}
            />
            {errors.catName && <Form.Text className="text-danger">{errors.catName.message}</Form.Text>}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="catDob">
            <Form.Label>Cat Date of Birth</Form.Label>
            <Controller
              name="catDob"
              control={control}
              rules={{ required: `Date of birth is required` }}
              render={({ field }) => <Form.Control type="date" {...field} />}
            />
            {errors.catDob && <Form.Text className="text-danger">{errors.catDob.message}</Form.Text>}
          </Form.Group>
        </Col>
      </Row>

      {/* Previous contact with the Cat Judicial System */}
      <Form.Group controlId="previousContact">
        <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
        <Controller
          name="previousContact"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="">Select...</option>
              <option value="0">No (score = 0)</option>
              <option value="1">Yes (score = 1)</option>
            </Form.Control>}
        />
        {errors.previousContact && <Form.Text className="text-danger">{errors.previousContact.message}</Form.Text>}
      </Form.Group>

      {/* Physical altercations with other cats */}
      <Form.Group controlId="altercationsWithCats">
        <Form.Label>Physical altercations with other cats</Form.Label>
        <Controller
          name="altercationsWithCats"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="">Select...</option>
              <option value="0">0-3 altercations (score = 0)</option>
              <option value="1">3+ altercations (score = 1)</option>
            </Form.Control>}
        />
        {errors.altercationsWithOwner &&
          <Form.Text className="text-danger"> {errors.altercationsWithOwner.message}
          </Form.Text>}
      </Form.Group>

      {/* Physical altercations with owner */}
      <Form.Group controlId="altercationsWithOwner"> <Form.Label>Physical altercations with owner</Form.Label>
        <Controller
          name="altercationsWithOwner"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="">Select...</option>
              <option value="0">0-10 altercations (score = 0)</option>
              <option value="1">10+ altercations (score = 1)</option>
            </Form.Control>}
        />
        {errors.altercationsWithOwner &&
          <Form.Text className="text-danger"> {errors.altercationsWithOwner.message}
          </Form.Text>}
      </Form.Group>

      {/* Plays well with dogs */}
      <Form.Group controlId="playsWellWithDogs">
        <Form.Label>Plays well with dogs</Form.Label>
        <Controller
          name="playsWellWithDogs"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="">Select...</option>
              <option value="0">No (score = 1)</option>
              <option value="1">Yes (score = 0)</option>
            </Form.Control>}
        />
        {errors.playsWellWithDogs && <Form.Text className="text-danger">{errors.playsWellWithDogs.message}</Form.Text>}
      </Form.Group>

      {/* Hisses at strangers */}
      <Form.Group controlId="hissesAtStrangers">
        <Form.Label>Hisses at strangers</Form.Label>
        <Controller
          name="hissesAtStrangers"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="">Select...</option>
              <option value="0">Yes (score = 1)</option>
              <option value="1">No (score = 0)</option>
            </Form.Control>}
        />
        {errors.hissesAtStrangers && <Form.Text className="text-danger">{errors.hissesAtStrangers.message}</Form.Text>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
