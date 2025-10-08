import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table, Spinner, Alert } from 'react-bootstrap';
import API_BASE_URL from '../utils/apiConfig';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError('');
    try {
  const res = await axios.get(`${API_BASE_URL}/api/Subscription/all`);
      setSubscriptions(res.data);
    } catch (err) {
      setError('Failed to load subscriptions.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleEdit = (sub) => {
    setEditData({ ...sub });
    setShowModal(true);
    setSuccess('');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await axios.put(
        `${API_BASE_URL}/api/Subscription/update`,
        {
          ...editData,
          price: Number(editData.price),
          durationDays: Number(editData.durationDays),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess('Subscription updated successfully.');
      setShowModal(false);
      fetchSubscriptions();
    } catch (err) {
      setError('Failed to update subscription.');
    }
    setSaving(false);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Subscription Plans</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Duration (days)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.name}</td>
                <td>{sub.price}</td>
                <td>{sub.durationDays}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEdit(sub)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duration (days)</Form.Label>
                <Form.Control
                  type="number"
                  name="durationDays"
                  value={editData.durationDays}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubscriptionList;
