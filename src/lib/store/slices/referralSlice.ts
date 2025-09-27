import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReferralState {
  pendingReferralCode: string | null;
  currentReferralCode: string | null;
  sourceUrl: string | null;
}

const initialState: ReferralState = {
  pendingReferralCode: null,
  currentReferralCode: null,
  sourceUrl: null,
};

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    setPendingReferralCode: (state, action: PayloadAction<string>) => {
      state.pendingReferralCode = action.payload;
    },
    setCurrentReferralCode: (state, action: PayloadAction<string>) => {
      state.currentReferralCode = action.payload;
    },
    setSourceUrl: (state, action: PayloadAction<string>) => {
      state.sourceUrl = action.payload;
    },
    clearPendingReferralCode: (state) => {
      state.pendingReferralCode = null;
    },
    clearReferralData: (state) => {
      state.pendingReferralCode = null;
      state.currentReferralCode = null;
      state.sourceUrl = null;
    },
  },
});

export const {
  setPendingReferralCode,
  setCurrentReferralCode,
  setSourceUrl,
  clearPendingReferralCode,
  clearReferralData,
} = referralSlice.actions;

export default referralSlice.reducer; 