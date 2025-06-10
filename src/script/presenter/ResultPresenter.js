const BASE_URL = process.env.API_BASE_URL;

class ResultPresenter {
    async fetchPredictions() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) throw new Error('Tidak ada token');

            const response = await fetch(`${BASE_URL}/predictions`, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Gagal mengambil hasil prediksi');

            const json = await response.json();

            const predictions = json?.data?.predictions || [];
            return predictions;
        } catch (error) {
            console.error('Fetch prediction error:', error);
            return [];
        }
    }

    async postPredictions(predictionText) {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) throw new Error('Tidak ada token');

            const response = await fetch(`${BASE_URL}/predictions` , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({ prediction: predictionText}),
            });

            if (!response.ok) {
            throw new Error('Gagal menyimpan prediksi ke API');
            }

            return await response.json();
        } catch (error) {
            console.error('API save error:', error);
        }
    }

    async deletePredictions(id) {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) throw new Error('Tidak ada token');

            const response = await fetch(`${BASE_URL}/predictions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Gagal menghapus prediksi');
            return true;
        } catch (error) {
            console.log('Error deleting predictions:', error);
        }
    }
}

export default ResultPresenter;