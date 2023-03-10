import { createSlice, PayloadAction} from '@reduxjs/toolkit';
type MemberData = {
  _id: string;
  username: string;
  image: string;
  simpletext?: string;
  memberClick: (id: string) => void;
};
type TaskData = {
  _id: string; 
  title: string; 
  content: string;
  uploadFiles: string;
  attachFiles: string;
  ownerId: string;
  clientId: string;
  status: string;
  taskType: string;
  dueDate: Date;
};
type CompanyData = {
  _id: number;
  name: string;
  address: string;
  phoneNumer: string;
  logoUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  contactPhoneNumber: string;
  contactId: number;
  clientId: number;
};
const initialState = {
    isCollapsed: true,
    isChatCollapsed: false,
    isTaskBoxCollapsed: false,
    currentIndex: "",
    inChannel: true,
    currentCompanyData: {
      _id: 0,
      name: "",
      address: "",
      phoneNumer: "",
      logoUrl: "",
      firstName: "",
      lastName: "",
      email: "",
      contactPhoneNumber: "",
      contactId: 0,
      clientId: 0
    },
    currentMember: null,
    currentCompany: 0,
    currentTask: 0,
    displayedMembers: [],
    messages: [],
    members: [],
    tasks: [],
    companies: [],
  }
export interface AppData {
  readonly currentIndex?: string;
  readonly isCollapsed?: Boolean;
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        toggleSideBar: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.isCollapsed = !state.isCollapsed;
      },
      setCurrentIndex:(state, { payload }: PayloadAction<string>) =>{
        state.currentIndex = payload;
      }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
    //   builder
    //     .addCase(incrementAsync.pending, (state) => {
    //       state.status = 'loading';
    //     })
    //     .addCase(incrementAsync.fulfilled, (state, action) => {
    //       state.status = 'idle';
    //       state.value += action.payload;
    //     });
    },
  });

  export const { toggleSideBar,setCurrentIndex} = appSlice.actions;
  export default appSlice.reducer;