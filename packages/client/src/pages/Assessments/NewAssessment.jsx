import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

export const NewAssessment = () => {
  const { control, formState: { errors }, getValues, handleSubmit, setValue } = useForm();
  const [ score, setScore ] = useState(0);
  const [ riskLevel, setRiskLevel ] = useState(``);

  // Calculate score based on user responses
  const calculateScore = (data) => {
    let totalScore = 0;

    // Add score based on responses (adjust the logic as needed)
    totalScore += parseInt(data.previousContact) || 0;
    totalScore += parseInt(data.altercationsWithCats) || 0;
    totalScore += parseInt(data.altercationsWithOwner) || 0;
    totalScore += parseInt(data.playsWellWithDogs) || 0;
    totalScore += parseInt(data.hissesAtStrangers) || 0;

    return totalScore;
  };

  // Determine the risk level based on the score
  const determineRiskLevel = (totalScore) => {
    if (totalScore <= 2) {
      return `Low`;
    }
    if (totalScore <= 4) {
      return `Medium`;
    }
    return `High`;
  };

  const onSubmit = (data) => {
    const totalScore = calculateScore(data);
    const risk = determineRiskLevel(totalScore);
    setScore(totalScore);
    setRiskLevel(risk);

    // Handle form submission
    console.log(`Submitted Data:`, data);
    console.log(`Total Score:`, totalScore);
    console.log(`Risk Level:`, risk);
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
            {errors.catName &&
              <Form.Text className="text-danger">
                {errors.catName.message}
              </Form.Text>}
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
            {errors.catDob &&
              <Form.Text className="text-danger">
                {errors.catDob.message}
              </Form.Text>}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="previousContact">
        <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
        <Controller
          name="previousContact"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="0">No (score = 0)</option>
              <option value="1">Yes (score = 1)</option>
            </Form.Control>}
        />
        {errors.previousContact &&
          <Form.Text className="text-danger">
            {errors.previousContact.message}
          </Form.Text>}
      </Form.Group>

      <Form.Group controlId="altercationsWithCats">
        <Form.Label>Physical altercations with other cats</Form.Label>
        <Controller
          name="altercationsWithCats"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="0">0-3 altercations (score = 0)</option>
              <option value="1">3+ altercations (score = 1)</option>
            </Form.Control>}
        />
        {errors.altercationsWithCats &&
          <Form.Text className="text-danger">
            {errors.altercationsWithCats.message}
          </Form.Text>}
      </Form.Group>

      <Form.Group controlId="altercationsWithOwner">
        <Form.Label>Physical altercations with owner</Form.Label>
        <Controller
          name="altercationsWithOwner"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="0">0-10 altercations (score = 0)</option>
              <option value="1">10+ altercations (score = 1)</option>
            </Form.Control>}
        />
        {errors.altercationsWithOwner &&
          <Form.Text className="text-danger">
            {errors.altercationsWithOwner.message}
          </Form.Text>}
      </Form.Group>

      <Form.Group controlId="playsWellWithDogs">
        <Form.Label>Plays well with dogs</Form.Label>
        <Controller
          name="playsWellWithDogs"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="0">No (score = 1)</option>
              <option value="1">Yes (score = 0)</option>
            </Form.Control>}
        />
        {errors.playsWellWithDogs &&
          <Form.Text className="text-danger">
            {errors.playsWellWithDogs.message}
          </Form.Text>}
      </Form.Group>

      <Form.Group controlId="hissesAtStrangers">
        <Form.Label>Hisses at strangers</Form.Label>
        <Controller
          name="hissesAtStrangers"
          control={control}
          rules={{ required: `Please select an option` }}
          render={({ field }) =>
            <Form.Control as="select" {...field}>
              <option value="0">Yes (score = 1)</option>
              <option value="1">No (score = 0)</option>
            </Form.Control>}
        />
        {errors.hissesAtStrangers &&
          <Form.Text className="text-danger">
            {errors.hissesAtStrangers.message}
          </Form.Text>}
      </Form.Group>

      {/* Show Score and Risk Level */}
      <div className="mt-3">
        <h5>Total Score: {score}</h5>
        <h5>Risk Level: {riskLevel}</h5>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
