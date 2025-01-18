import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const apiCheckUser = async (credentials) => {
  console.log("Vérification de l'utilisateur: ", credentials.username);
  // Vérifiez si l'id ou le nom d'utilisateur est bien présent
  if (!credentials.username) {
    throw new Error("Nom d'utilisateur manquant");
  }

  // Effectuer la requête pour vérifier si l'utilisateur existe
  try {
    const response = await axios.get(
      `http://localhost:5001/users?username=${credentials.username}`
    );
    return response;
  } catch (error) {
    throw new Error("Utilisateur non trouvé");
  }
};

// Connexion de l'utilisateur
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiCheckUser(credentials); // Vérifie si l'utilisateur existe
      if (response.data && response.data.length > 0) {
        // Si utilisateur trouvé
        console.log("Utilisateur trouvé, tentative de connexion");
        const loginResponse = await apiLogin(credentials); // Connexion réussie
        return loginResponse.data;
      } else {
        return rejectWithValue("Utilisateur non trouvé.");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "Erreur lors de la tentative de connexion."
      );
    }
  }
);

// Inscrire un nouvel utilisateur
export const apiRegisterUser = async (credentials) => {
  return axios.post("http://localhost:5001/users", credentials);
};

// Connexion d'un utilisateur
export const apiLogin = async (credentials) => {
  return axios.post("http://localhost:5001/users", credentials);
};

// Inscription de l'utilisateur
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const registerResponse = await apiRegisterUser(credentials);
      return registerResponse.data;
    } catch (error) {
      return rejectWithValue("Erreur lors de l'inscription.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    mode: "login", // Le mode initial est "login"
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.mode = "login"; // Retourner au mode connexion
    },

    toggleMode: (state) => {
      state.mode = state.mode === "login" ? "register" : "login";
    },
    // Autres reducers
  },
  extraReducers: (builder) => {
    builder
      // Gestion du login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Réinitialiser l'erreur pendant la requête
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.mode = "login"; // Retour au mode connexion après une connexion réussie
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Erreur lors de la tentative de connexion"; // Afficher l'erreur du login
      });

    // Gestion de l'inscription
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null; // Réinitialiser l'erreur pendant la requête
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.mode = "login"; // Retour au mode connexion après une inscription réussie
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur lors de l'inscription"; // Afficher l'erreur d'inscription
      });
  },
});

export const { logout, toggleMode } = authSlice.actions;

export default authSlice.reducer;
