import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import MultipleImageUpload from '../components/MultipleImageUpload';
import styles from '../styles/components/submitTopic.module.css';
import { createPoll } from '../api/pollApi';

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
  const navigate = useNavigate();
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<Array<{id: string, url: string, description: string, file?: File}>>([]);
  const [options, setOptions] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [allImagesUploaded, setAllImagesUploaded] = useState(true); // Track upload status

  const handleOptionChange = useCallback((idx: number, value: string) => {
    setOptions((opts) => opts.map((opt, i) => (i === idx ? value : opt)));
  }, []);

  const addOption = useCallback(() => setOptions((opts) => [...opts, '']), []);
  
  const removeOption = useCallback((idx: number) => {
    setOptions((opts) => opts.filter((_, i) => i !== idx));
  }, []);

  const handleImagesChange = useCallback((newImages: Array<{id: string, url: string, description: string, file?: File}>) => {
    setImages(newImages);
  }, []);

  const handleUploadStatusChange = useCallback((allUploaded: boolean) => {
    setAllImagesUploaded(allUploaded);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (!description || options.filter(opt => opt.trim()).length < 2) {
      setError('Please fill in the poll question and provide at least 2 options.');
      setLoading(false);
      return;
    }

    // Check for blob URLs (shouldn't happen with our new logic, but safety check)
    const hasBlobUrls = images.some(img => img.url.startsWith('blob:'));
    if (hasBlobUrls) {
      setError('Please wait for all images to finish uploading to Cloudinary.');
      setLoading(false);
      return;
    }

    try {
      // Get current user from localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        setError('Please log in to create a poll.');
        setLoading(false);
        return;
      }
      
      const user = JSON.parse(userStr);
      
      // Create poll via API
      await createPoll({
        title: description, // Use description as title
        category,
        description,
        creator_id: user.id,
        options: options.filter(opt => opt.trim()),
        images: images.map(img => ({ url: img.url, description: img.description })), // Add multiple images
      });

      // Reset form on success
      setSuccess(true);
      setCategory(categories[0]);
      setDescription('');
      setImages([]);
      setOptions(['', '']);
      
      // Auto-redirect to home page after 1.5 seconds to show the new poll
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
      // Redirect to home page after successful poll creation
      setTimeout(() => {
        navigate('/');
      }, 1500); // 1.5 second delay to show success message
    } catch (err: any) {
      setError(err.message || 'Failed to create poll. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.submitBg}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Submit a New Poll Topic</h2>
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
          <label className={styles.label}>Poll Question</label>
        </div>
        <MultipleImageUpload
          onImagesChange={handleImagesChange}
          onUploadStatusChange={handleUploadStatusChange}
          maxImages={5}
        />
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
        <Button variant="primary" type="submit" disabled={loading || (images.length > 0 && !allImagesUploaded)}>
          {loading ? 'Submitting...' : 
           (images.length > 0 && !allImagesUploaded) ? 'Uploading images...' : 
           'Submit'}
        </Button>
        {error && <div className={styles.errorMsg}>❌ {error}</div>}
        {success && <div className={styles.successMsg}>✅ Poll submitted successfully!</div>}
      </form>
    </div>
  );
};

export default SubmitTopic;
