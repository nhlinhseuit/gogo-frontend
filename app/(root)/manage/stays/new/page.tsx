"use client";
import React, {FormEvent, useEffect, useState} from 'react';
import {createNewStay, getAllAmenities, getAllLocations} from '@/lib/actions/ManageActions';
import Amenity from "@/types/Amenity";
import LocationType from "@/types/LocationType";

const AddNewStay: React.FC = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  // Form state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [locationId, setLocationId] = useState('');
  const [starRating, setStarRating] = useState(1);
  const [stayType, setStayType] = useState<'HOTEL' | 'MOTEL' | 'RESORT'>('HOTEL');
  const [overview, setOverview] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [latitude, setLatitude] = useState('0');
  const [longitude, setLongitude] = useState('0');
  const [isLoading, setisLoading] = useState(false);

  // Fetch locations and amenities on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLocations = await getAllLocations();
        const fetchedAmenities = await getAllAmenities();

        setLocations(fetchedLocations as LocationType[]);
        setAmenities(fetchedAmenities);
      } catch (error) {
        console.error('Failed to fetch locations or amenities', error);
      }
    };

    fetchData();
  }, []);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).slice(0, 2);
      setImages(fileArray);
    }
  };

  // Handle amenity selection
  const handleAmenityChange = (amenityId: number) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('location_id', locationId);
    formData.append('star_rating', starRating.toString());
    formData.append('stay_type', stayType);
    formData.append('overview', overview);
    formData.append('latitude', '0');
    formData.append('longitude', '0');

    formData.append('amenities', selectedAmenities.join(', '));

    images.forEach((image, index) => {
      formData.append(`image_${index + 1}`, image);
    });

    try {
      const newStay = await createNewStay(formData);
      console.log('New stay created:', newStay);
    } catch (error) {
      console.error('Failed to create stay', error);
    }
    setisLoading(false);
  };

  return (
    <div>
      <h1 className="h2-bold py-8">Create New Stay</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block font-medium">Latitude</label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter latitude"
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium">Longitude</label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter longitude"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Location</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.city}, {location.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Star Rating</label>
          <select
            value={starRating}
            onChange={(e) => setStarRating(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {[1, 2, 3, 4, 5].map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Stay Type</label>
          <select
            value={stayType}
            onChange={(e) => setStayType(e.target.value as 'HOTEL' | 'MOTEL' | 'RESORT')}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="HOTEL">Hotel</option>
            <option value="MOTEL">Motel</option>
            <option value="RESORT">Resort</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Overview</label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-medium">Amenities</label>
          <div className="grid grid-cols-3 gap-2 p-2 border border-gray-300 rounded">
            {amenities.map(amenity => (
              <label key={amenity.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity.id)}
                  onChange={() => handleAmenityChange(amenity.id)}
                  className="mr-2"
                />
                {amenity.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Images (Max 2)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            max={2}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="mt-2 flex space-x-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-100 w-full rounded"
          >
            Create Stay
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewStay;
