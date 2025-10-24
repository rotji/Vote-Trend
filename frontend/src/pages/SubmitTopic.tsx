import React, { useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/components/submitTopic.module.css';

const categories = [
  'Sports',
  'Politics',
  'Entertainment',
  'Health',
  'Tech',
  'Education',
  'Others',
];

const SubmitTopic: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [options, setOptions] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOptionChange = (idx: number, value: string) => {
    setOptions((opts) => opts.map((opt, i) => (i === idx ? value : opt)));
  };

  const addOption = () => setOptions((opts) => [...opts, '']);
  const removeOption = (idx: number) => setOptions((opts) => opts.filter((_, i) => i !== idx));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTitle('');
      setCategory(categories[0]);
      setDescription('');
      setImage(null);
      setOptions(['', '']);
    }, 1500);
  };

  return (
    <div className={styles.submitBg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Submit a New Poll Topic</h2>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            placeholder=" "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label className={styles.label}>Title</label>
        </div>
        <div className={styles.inputGroup}>
          <select
            className={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <label className={styles.label}>Category</label>
        </div>
        <div className={styles.inputGroup}>
          <textarea
            className={styles.input}
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
          <label className={styles.label}>Description</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            type="file"
            accept="image/*"
            className={styles.input}
            onChange={handleImage}
          />
          <label className={styles.label}>Upload Image</label>
        </div>
        <div className={styles.optionsSection}>
          <label className={styles.optionsLabel}>Options</label>
          {options.map((opt, idx) => (
            <div key={idx} className={styles.optionRow}>
              <input
                className={styles.input}
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                required
              />
              {options.length > 2 && (
                <button type="button" className={styles.removeBtn} onClick={() => removeOption(idx)}>
                  &times;
                </button>
              )}
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={addOption}>
            + Add Option
          </button>
        </div>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
        {success && <div className={styles.successMsg}>✅ Poll submitted successfully!</div>}
      </form>
    </div>
  );
};

export default SubmitTopic;
