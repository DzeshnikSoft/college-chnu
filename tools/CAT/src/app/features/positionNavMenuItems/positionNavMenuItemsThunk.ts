import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/app/apiClient';
import { getErrorMessage } from '@/factories/errorMessage.factory';

const url = 'api/';
