// import React from 'react';
// import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
// import users from '../apis/streams';
// import GridList from './GridList';

// const queryClient = new QueryClient();

// const CamData = () => {
//   const { isLoading, error, data } = useQuery(
//     ['repoData'],
//     async () => await users.get('/users'),
//   );
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error...</div>;
//   return <GridList people={data.data} />;
// };

// const UserData = (props) => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div>camData</div>
//       <CamData />
//     </QueryClientProvider>
//   );
// };

// export default UserData;
