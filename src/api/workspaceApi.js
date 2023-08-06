import axios from 'axios';

const WS_BASE_URL = '/api/v1/workspaces';

export const createWorkspace = async (workspaceData) => {
    try {
        const response = await axios.post(WS_BASE_URL, workspaceData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to create a new workspace.');
    }
};

export const getWorkspaces = async () => {
    try {
        const response = await axios.get(`${WS_BASE_URL}/`);

        return response.data;
    } catch (error) {
        throw new Error(error.error ? error.error : 'Failed to get workspace details.');
    }
};

export const getWorkspaceById = async (workspaceId) => {
    try {
        const response = await axios.get(`${WS_BASE_URL}/`);

        return response.data;
    } catch (error) {
        throw new Error('Failed to get workspace details.');
    }
};

// Add other API functions for updating and deleting workspaces
export const deleteWorkspaceById = async (workspaceId) => {
    try {
        const response = await axios.delete(`${WS_BASE_URL}/${workspaceId}`);

        return response.data;
    } catch (error) {
        throw new Error('Failed to delete workspace.');
    }
};