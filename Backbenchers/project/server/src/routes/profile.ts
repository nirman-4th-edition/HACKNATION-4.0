import express, { Request, Response, Router } from 'express';
import UserProfile from '../models/UserProfile';

const router = Router();

// Endpoint to save (create) profile data
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { profileId, name, email, residenceType, annualIncome, age, numberOfDependants } = req.body;

  try {
    // Check if the profile already exists
    const existingProfile = await UserProfile.findOne({ profileId });

    if (existingProfile) {
      res.status(400).json({ message: 'Profile already exists' });
      return;
    }

    // Create a new profile
    const newProfile = new UserProfile({
      profileId,
      name,
      email,
      residenceType,
      annualIncome,
      age,
      numberOfDependants
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error saving profile', error });
  }
});

// Endpoint to get profile data
router.get('/:profileId', async (req: Request, res: Response): Promise<void> => {
  const { profileId } = req.params;

  try {
    const profile = await UserProfile.findOne({ profileId });

    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

// Endpoint to update profile data (change POST to PUT)
router.put('/:profileId', async (req: Request, res: Response): Promise<void> => {
  const { profileId } = req.params;
  const { name, email, residenceType, annualIncome, age, numberOfDependants } = req.body;

  try {
    // Find and update the profile
    const updatedProfile = await UserProfile.findOneAndUpdate(
      { profileId }, 
      { name, email, residenceType, annualIncome, age, numberOfDependants },
      { new: true } // Return the updated profile
    );

    if (!updatedProfile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

export default router;
