import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { control, formState: { errors }, handleSubmit, watch } = useForm();
  const [ score, setScore ] = useState(0);
  const [ riskLevel, setRiskLevel ] = useState(``);

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
    if (totalScore <= 2) {
      return `Low`;
    }
    if (totalScore <= 4) {
      return `Medium`;
    }
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
      const result = await AssessmentService.submit({
        altercationsWithCats: data.altercationsWithCats,
        altercationsWithOwner: data.altercationsWithOwner,
        catDob: data.catDob,
        catName: data.catName,
        hissesAtStrangers: data.hissesAtStrangers,
        instrumentType: data.instrumentType,
        playsWellWithDogs: data.playsWellWithDogs,
        previousContact: data.previousContact,
        riskLevel: risk,
        score: total,
      });

      console.log(`Assessment submitted successfully:`, result);
    } catch (error) {
      console.error(`Error submitting assessment:`, error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group controlId="instrumentType">
            <Form.Label>Instrument Type</Form.Label>
            <Controller
              name="instrumentType"
              control={control}
              rules={{ required: `Instrument type is required` }}
              defaultValue=""
              render={({ field }) =>
                <Form.Control as="select" {...field}>
                  <option value="">Select an instrument type</option>
                  <option value="Behavioral">Behavioral</option>
                  <option value="Psychological">Psychological</option>
                  <option value="Medical">Medical</option>
                </Form.Control>}
            />
            {errors.instrumentType &&
              <Form.Text className="text-danger">{errors.instrumentType.message}</Form.Text>}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="catName">
            <Form.Label>Cat Name</Form.Label>
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
            <Form.Label>Cat Date of Birth</Form.Label>
            <Controller
              name="cat_Dob"
              control={control}
              rules={{ required: `Date of birth is required` }}
              defaultValue=""
              render={({ field }) => <Form.Control type="date" {...field} />}
            />
            {errors.catDob && <Form.Text className="text-danger">{errors.catDob.message}</Form.Text>}
          </Form.Group>
        </Col>
      </Row>

      {/* Dropdown fields */}
      <Form.Group controlId="previousContact">
        <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
        <Controller
          name="previousContact"
          control={control}
          rules={{ required: `Please select an option` }}
          defaultValue=""
          render={({ field }) =>
            <Form.Control as="select" {...field} value={field.value ?? ``}>
              <option value="">Select an option</option>
              <option value="0">No (score = 0)</option>
              <option value="1">Yes (score = 1)</option>
            </Form.Control>}
        />
        {errors.previousContact && <Form.Text className="text-danger">{errors.previousContact.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId="altercationsWithCats">
        <Form.Label>Physical altercations with other cats</Form.Label>
        <Controller
          name="altercationsWithCats"
          control={control}
          rules={{ required: `Please select an option` }}
          defaultValue=""
          render={({ field }) =>
            <Form.Control as="select" {...field} value={field.value ?? ``}>
              <option value="">Select an option</option>
              <option value="0">0-3 altercations (score = 0)</option>
              <option value="1">3+ altercations (score = 1)</option>
            </Form.Control>}
        />
        {errors.altercationsWithCats &&
          <Form.Text className="text-danger">{errors.altercationsWithCats.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId="altercationsWithOwner">
        <Form.Label>Physical altercations with owner</Form.Label>
        <Controller
          name="altercationsWithOwner"
          control={control}
          rules={{ required: `Please select an option` }}
          defaultValue=""
          render={({ field }) =>
            <Form.Control as="select" {...field} value={field.value ?? ``}>
              <option value="">Select an option</option>
              <option value="0">0-10 altercations (score = 0)</option>
              <option value="1">10+ altercations (score = 1)</option>
            </Form.Control>}
        />
        {errors.altercationsWithOwner &&
          <Form.Text className="text-danger">{errors.altercationsWithOwner.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId="playsWellWithDogs">
        <Form.Label>Plays well with dogs</Form.Label>
        <Controller
          name="playsWellWithDogs"
          control={control}
          rules={{ required: `Please select an option` }}
          defaultValue=""
          render={({ field }) =>
            <Form.Control as="select" {...field} value={field.value ?? ``}>
              <option value="">Select an option</option>
              <option value="0">Yes (score = 0)</option>
              <option value="1">No (score = 1)</option>
            </Form.Control>}
        />
        {errors.playsWellWithDogs && <Form.Text className="text-danger">{errors.playsWellWithDogs.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId="hissesAtStrangers">
        <Form.Label>Hisses at strangers</Form.Label>
        <Controller
          name="hissesAtStrangers"
          control={control}
          rules={{ required: `Please select an option` }}
          defaultValue=""
          render={({ field }) =>
            <Form.Control as="select" {...field} value={field.value ?? ``}>
              <option value="">Select an option</option>
              <option value="1">Yes (score = 1)</option>
              <option value="0">No (score = 0)</option>
            </Form.Control>}
        />
        {errors.hissesAtStrangers && <Form.Text className="text-danger">{errors.hissesAtStrangers.message}</Form.Text>}
      </Form.Group>

      {/* Score display */}
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
