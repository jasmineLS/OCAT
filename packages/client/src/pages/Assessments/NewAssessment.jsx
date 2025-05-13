import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { control, formState: { errors }, handleSubmit, reset, watch } = useForm();
  const [ score, setScore ] = useState(0);
  const [ riskLevel, setRiskLevel ] = useState(``);
  const [ notification, setNotification ] = useState(``);

  const calculateScore = (data) => {
    let totalScore = 0;
    totalScore += Number(data.previousContact) || 0;
    totalScore += Number(data.altercationsWithCats) || 0;
    totalScore += Number(data.altercationsWithOwner) || 0;
    totalScore += Number(data.playsWellWithDogs) || 0;
    totalScore += Number(data.hissesAtStrangers) || 0;
    return totalScore;
  };

  const determineRiskLevel = (totalScore) => {
    if (totalScore <= 2) { return `Low`; }
    if (totalScore <= 4) { return `Medium`; }
    return `High`;
  };

  const watchedValues = watch([
    `previousContact`,
    `altercationsWithCats`,
    `altercationsWithOwner`,
    `playsWellWithDogs`,
    `hissesAtStrangers`,
  ]);

  useEffect(() => {
    const total = calculateScore({
      altercationsWithCats: watchedValues[1],
      altercationsWithOwner: watchedValues[2],
      hissesAtStrangers: watchedValues[4],
      playsWellWithDogs: watchedValues[3],
      previousContact: watchedValues[0],
    });
    setScore(total);
    setRiskLevel(determineRiskLevel(total));
  }, [ watchedValues ]);

  const onSubmit = async (data) => {
    const total = calculateScore(data);
    const risk = determineRiskLevel(total);
    setScore(total);
    setRiskLevel(risk);

    try {
      await AssessmentService.submit({
        ...data,
        riskLevel: risk,
        score: total,
      });
      setNotification(`Assessment submitted successfully!`);
      setTimeout(() => setNotification(``), 3000);
      reset();
    } catch (error) {
      setNotification(`Error submitting assessment.`);
      setTimeout(() => setNotification(``), 3000);
    }
  };

  return (
    <>
      {notification && <Alert variant="info" className="mt-3">{notification}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="instrumentType">
              <Form.Label><strong>Instrument Type</strong></Form.Label>
              <Controller
                name="instrumentType"
                control={control}
                rules={{ required: `Instrument type is required` }}
                defaultValue=""
                render={({ field }) =>
                  <Form.Select {...field}>
                    <option value="">Select an instrument type</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="Psychological">Psychological</option>
                    <option value="Medical">Medical</option>
                  </Form.Select>}
              />
              {errors.instrumentType && <Form.Text className="text-danger">{errors.instrumentType.message}</Form.Text>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="catName">
              <Form.Label><strong>Cat Name</strong></Form.Label>
              <Controller
                name="catName"
                control={control}
                rules={{ required: `Cat name is required` }}
                defaultValue=""
                render={({ field }) => <Form.Control {...field} />}
              />
              {errors.catName && <Form.Text className="text-danger">{errors.catName.message}</Form.Text>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="catDob">
              <Form.Label><strong>Cat Date of Birth</strong></Form.Label>
              <Controller
                name="catDob"
                control={control}
                rules={{ required: `Date of birth is required` }}
                defaultValue=""
                render={({ field }) => <Form.Control type="date" {...field} />}
              />
              {errors.catDob && <Form.Text className="text-danger">{errors.catDob.message}</Form.Text>}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="previousContact" className="mb-3">
          <Form.Label><strong>Previous contact with the Cat Judicial System</strong></Form.Label>
          <Controller
            name="previousContact"
            control={control}
            rules={{ required: `Please select an option` }}
            defaultValue=""
            render={({ field }) =>
              <>
                <Form.Check
                  type="radio"
                  label="No (score = 0)"
                  value="0"
                  checked={field.value === `0`}
                  onChange={field.onChange}
                  name={field.name}
                />
                <Form.Check
                  type="radio"
                  label="Yes (score = 1)"
                  value="1"
                  checked={field.value === `1`}
                  onChange={field.onChange}
                  name={field.name}
                />
              </>}
          />
          {errors.previousContact && <Form.Text className="text-danger">{errors.previousContact.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="altercationsWithCats" className="mb-3">
          <Form.Label><strong>Physical altercations with other cats</strong></Form.Label>
          <Controller
            name="altercationsWithCats"
            control={control}
            rules={{ required: `Please select an option` }}
            defaultValue=""
            render={({ field }) =>
              <>
                <Form.Check
                  type="radio"
                  label="0-3 altercations (score = 0)"
                  value="0"
                  checked={field.value === `0`}
                  onChange={field.onChange}
                  name={field.name}
                />
                <Form.Check
                  type="radio"
                  label="3+ altercations (score = 1)"
                  value="1"
                  checked={field.value === `1`}
                  onChange={field.onChange}
                  name={field.name}
                />
              </>}
          />
          {errors.altercationsWithCats &&
            <Form.Text className="text-danger">{errors.altercationsWithCats.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="altercationsWithOwner" className="mb-3">
          <Form.Label><strong>Physical altercations with owner</strong></Form.Label>
          <Controller
            name="altercationsWithOwner"
            control={control}
            rules={{ required: `Please select an option` }}
            defaultValue=""
            render={({ field }) =>
              <>
                <Form.Check
                  type="radio"
                  label="0-10 altercations (score = 0)"
                  value="0"
                  checked={field.value === `0`}
                  onChange={field.onChange}
                  name={field.name}
                />
                <Form.Check
                  type="radio"
                  label="10+ altercations (score = 1)"
                  value="1"
                  checked={field.value === `1`}
                  onChange={field.onChange}
                  name={field.name}
                />
              </>}
          />
          {errors.altercationsWithOwner &&
            <Form.Text className="text-danger">{errors.altercationsWithOwner.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="playsWellWithDogs" className="mb-3">
          <Form.Label><strong>Plays well with dogs</strong></Form.Label>
          <Controller
            name="playsWellWithDogs"
            control={control}
            rules={{ required: `Please select an option` }}
            defaultValue=""
            render={({ field }) =>
              <>
                <Form.Check
                  type="radio"
                  label="Yes (score = 0)"
                  value="0"
                  checked={field.value === `0`}
                  onChange={field.onChange}
                  name={field.name}
                />
                <Form.Check
                  type="radio"
                  label="No (score = 1)"
                  value="1"
                  checked={field.value === `1`}
                  onChange={field.onChange}
                  name={field.name}
                />
              </>}
          />
          {errors.playsWellWithDogs &&
            <Form.Text className="text-danger">{errors.playsWellWithDogs.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="hissesAtStrangers" className="mb-3">
          <Form.Label><strong>Hisses at strangers</strong></Form.Label>
          <Controller
            name="hissesAtStrangers"
            control={control}
            rules={{ required: `Please select an option` }}
            defaultValue=""
            render={({ field }) =>
              <>
                <Form.Check
                  type="radio"
                  label="Yes (score = 1)"
                  value="1"
                  checked={field.value === `1`}
                  onChange={field.onChange}
                  name={field.name}
                />
                <Form.Check
                  type="radio"
                  label="No (score = 0)"
                  value="0"
                  checked={field.value === `0`}
                  onChange={field.onChange}
                  name={field.name}
                />
              </>}
          />
          {errors.hissesAtStrangers &&
            <Form.Text className="text-danger">{errors.hissesAtStrangers.message}</Form.Text>}
        </Form.Group>

        <div className="mt-4">
          <h6><strong>Total Score: {score}</strong></h6>
          <h6><strong>Risk Level: {riskLevel}</strong></h6>
        </div>

        <div className="mt-3">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};
