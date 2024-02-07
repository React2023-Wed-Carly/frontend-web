import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './CarDetailsPage.css'; 
import MapPicker from '../components/MapPicker';
import 'leaflet/dist/leaflet.css';
import { requestCreateCar, updateCarImage } from '../redux/thunks';

const AddCarPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwtToken = useSelector((state) => state.jwttoken);
    const [newFeature, setNewFeature] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [editedCar, setEditedCar] = useState({
        brand: '',
        model: '',
        mileage: '',
        year: 0,
        ownerId: '',
        dailyPrice: '',
        description: '',
        latitude: 0,
        longitude: 0,
        seatingCapacity: 0,
        fuelType: '',
        transmission: '',
        licensePlateNumber: '',
        features: [],
    });

    const assembleJSON = () => {
        const jsonToSave = {
            brand: editedCar.brand,
            model: editedCar.model,
            mileage: parseInt(editedCar.mileage),
            year: parseInt(editedCar.year),
            ownerId: parseInt(editedCar.ownerId),
            dailyPrice: parseInt(editedCar.dailyPrice),
            description: editedCar.description,
            latitude: editedCar.latitude,
            longitude: editedCar.longitude,
            seatingCapacity: parseInt(editedCar.seatingCapacity),
            fuelType: editedCar.fuelType,
            transmission: editedCar.transmission,
            licensePlateNumber: editedCar.licensePlateNumber,
            features: editedCar.features.join(','),
            photo: null,
        };
        return jsonToSave;
    };

    const handleLocationChange = (location) => {
        setSelectedLocation(location);
        console.log(selectedLocation);
        setEditedCar((prevCar) => ({
            ...prevCar,
            latitude: location.lat,
            longitude: location.lng,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCar((prevCar) => ({
            ...prevCar,
            [name]: value,
        }));
    };


    const handleSave = async() =>  {
        const body = assembleJSON();
        const response = await dispatch(requestCreateCar(jwtToken, body));
        console.log(response)
        if (response && response.status >= 200 && response.status < 300) {
            console.log(`Car created successfully!`);
            const carId = response.data.id;
            console.log("car ID:", carId);
            if (uploadedImage) {
                const formData = new FormData();
                formData.append('file', uploadedImage);
                await dispatch(updateCarImage(jwtToken, carId, formData));
            }
        }
        navigate('/home/cars');
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUploadedImage(file);
    };

    const addFeature = () => {
        if (newFeature.trim() !== '') {
            const updatedFeatures = [...editedCar.features, newFeature];
            setEditedCar((prevCar) => ({
                ...prevCar,
                features: updatedFeatures
            }));
            setNewFeature('');
        }
    };

    const deleteFeature = (index) => {
        const updatedFeatures = [...editedCar.features];
        updatedFeatures.splice(index, 1);
        console.log(updatedFeatures);
        setEditedCar((prevCar) => ({
            ...prevCar,
            features: updatedFeatures,
        }));
    }

    return (
        <div className="column is-half">
            <h2 className="title is-4">Add new car</h2>
            <div className="field">
                <label className="label">Photo:</label>
                <div className="control">

                    <div class="file has-name">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume" onChange={handleFileChange} />
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                            </span>
                            <span class="file-name">
                                {uploadedImage ? uploadedImage.name : ""}
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="field">
                <label className="label">Owner ID:</label>
                <div className="control">

                    <input
                        className="input"
                        type="text"
                        name="ownerId"
                        value={editedCar.ownerId}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Brand:</label>
                <div className="control">

                    <input
                        className="input"
                        type="text"
                        name="brand"
                        value={editedCar.brand}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Model:</label>
                <div className="control">

                    <input
                        className="input"
                        type="text"
                        name="model"
                        value={editedCar.model}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Year:</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        name="year"
                        value={editedCar.year}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Description:</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        name="description"
                        value={editedCar.description}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Daily Price:</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        name="dailyPrice"
                        value={editedCar.dailyPrice}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Location:</label>
                <div className="MapPicker-container">
                    <MapPicker onLocationChange={handleLocationChange} />
                    {selectedLocation && (
                        <div>
                            Latitude: {selectedLocation.lat}, Longitude: {selectedLocation.lng}
                        </div>
                    )}
                </div>

            </div>

            <div className="field">
                <label className="label">Fuel Type:</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="fuelType"
                        value={editedCar.fuelType}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Transmission:</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="transmission"
                        value={editedCar.transmission}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Seating Capacity:</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        name="seatingCapacity"
                        value={editedCar.seatingCapacity}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Mileage:</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        name="mileage"
                        value={editedCar.mileage}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field">
                <label className="label">Features:</label>
                <div className="control">
                    <div>
                        {editedCar.features.map((feature, index) => (
                            <div key={index} className="feature-edit">
                                <input
                                    className="input"
                                    type="text"
                                    value={feature}
                                    onChange={(e) => {
                                        const updatedFeatures = [...editedCar.features];
                                        updatedFeatures[index] = e.target.value;
                                        setEditedCar((prevCar) => ({
                                            ...prevCar,
                                            features: updatedFeatures,
                                        }));
                                    }}
                                />
                                <button
                                    className="button is-danger is-small"
                                    onClick={() => deleteFeature(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        <div className="feature-edit">
                            <input
                                className="input"
                                type="text"
                                placeholder="New Feature"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                            />
                            <button
                                className="button is-success is-small"
                                onClick={addFeature}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="field">
                <label className="label">License Plate Number:</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="licensePlateNumber"
                        value={editedCar.licensePlateNumber}
                        onChange={handleInputChange}
                    />

                </div>
            </div>

            <div className="field is-grouped">
                <>
                    <div className="control">
                        <button className="button is-success" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </>

            </div>
        </div>
    );
};

export default AddCarPage;