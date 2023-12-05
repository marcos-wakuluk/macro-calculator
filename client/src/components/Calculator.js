import React, { useState } from 'react';
import InputField from './Input';
import Button from './Button';

const initialInputs = {
  height: 0,
  weight: 0,
  gender: '',
  activityLevel: '',
  objetive: '',
  age: 0,
  email: '',
};

const initialResult = {
  totalCalories: 0,
  proteinCalories: 0,
  carbCalories: 0,
  fatCalories: 0,
}

const genderOptions = ["Masculino", "Femenino"]
const activityLevelOptions = ["Sedentario", "Ligeramente Activo", "Moderadamente activo", "Muy activo", "Extremadamente activo"]
const objetiveOptions = ["Definicion", "Volumen"]

const MacronutrientCalculator = () => {
  const [result, setResult] = useState(initialResult);
  const [inputs, setInputs] = useState(initialInputs);
  const [showInputs, setShowInputs] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCalculation = () => {
    setLoading(true);
    setShowInputs(false);

    // Calculating Basal Metabolic Rate (BMR)
    const bmr = inputs.gender === 'Masculino'
      ? 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age + 5
      : 10 * inputs.weight + 6.25 * inputs.height - 5 * inputs.age - 161

    // Adjusting based on activity level
    const activityLevels = {
      'Sedentario': 1.2,
      'Ligeramente Activo': 1.375,
      'Moderadamente activo': 1.55,
      'Muy activo': 1.725,
      'Extremadamente activo': 1.9,
    };
    const activityMultiplier = activityLevels[inputs.activityLevel];
    const totalCalories = Math.round(bmr * activityMultiplier);

    // Adjusting based on goal (Volumen o Definición)
    const adjustedCalories = inputs.objetive === 'Volumen'
      ? totalCalories * 1.2
      : totalCalories * 0.8

    // Calculating macronutrients
    const proteinPercentage = 0.25; // 25% of total calories from protein
    const carbPercentage = 0.55; // 55% of total calories from carbs
    const fatPercentage = 0.2; // 20% of total calories from fat

    const proteinCalories = Math.round(adjustedCalories * proteinPercentage);
    const carbCalories = Math.round(adjustedCalories * carbPercentage);
    const fatCalories = Math.round(adjustedCalories * fatPercentage);

    // Calculating grams from calories (4 calories per gram of carbs/protein, 9 calories per gram of fat)
    const proteinGrams = Math.round(proteinCalories / 4);
    const carbGrams = Math.round(carbCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    setTimeout(() => {
      setResult({
        totalCalories: Math.round(adjustedCalories),
        proteinCalories,
        carbCalories,
        fatCalories,
        proteinGrams,
        carbGrams,
        fatGrams,
      });
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  const handleReturn = () => {
    handleReset()
    setShowInputs(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  };

  const isAnyInputFilled = () => {
    return inputs.height || inputs.weight || inputs.gender || inputs.activityLevel || inputs.objetive || inputs.age || inputs.email;
  };

  const areAllInputsFilled = () => {
    return inputs.height && inputs.weight && inputs.gender && inputs.activityLevel && inputs.objetive && inputs.age && inputs.email;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {showInputs && (
        <>
          <h2 className="text-2xl font-bold mb-4">Calculadora de Macronutrientes</h2>

          <InputField label="Email" name="email" value={inputs.email} onChange={handleInputChange} type='text' setInputs={setInputs} />
          <InputField label="Genero" name="gender" value={inputs.gender} onChange={handleInputChange} type="select" options={genderOptions} setInputs={setInputs} />
          <InputField label="Edad" name="age" value={inputs.age} onChange={handleInputChange} setInputs={setInputs} />
          <InputField label="Peso (Kg)" name="weight" value={inputs.weight} onChange={handleInputChange} setInputs={setInputs} />
          <InputField label="Altura (cm)" name="height" value={inputs.height} onChange={handleInputChange} setInputs={setInputs} />
          <InputField label="Nivel de actividad fisica" name="activityLevel" value={inputs.activityLevel} onChange={handleInputChange} type="select" options={activityLevelOptions} setInputs={setInputs} />
          <InputField label="Objetivo" name="objetive" value={inputs.objetive} onChange={handleInputChange} type="select" options={objetiveOptions} setInputs={setInputs} />

          <div className='flex justify-around'>
            <Button
              onClick={handleReset}
              text="Limpiar"
              disabled={!isAnyInputFilled()}
              className={isAnyInputFilled() ? '' : 'opacity-50 cursor-not-allowed'}
            />
            <Button
              onClick={handleCalculation}
              text="Calcular"
              disabled={!areAllInputsFilled()}
              className={areAllInputsFilled() ? '' : 'opacity-50 cursor-not-allowed'}
            />
          </div>
        </>
      )}
      {loading && (
        <div className="spinner">
          <div role="status">
            <svg aria-hidden="true" class="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
        </div>
      )}
      {!loading && !showInputs && (
        <>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Resultados:</h3>
            <p>Total de calorías: {result.totalCalories}</p>
            <p>Gramos de Proteínas: {result.proteinGrams}</p>
            <p>Gramos de Carbohidratos: {result.carbGrams}</p>
            <p>Gramos de Grasas: {result.fatGrams}</p>
          </div>
          <div className='flex justify-around'>
            <button
              onClick={handleReturn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Volver
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MacronutrientCalculator;
