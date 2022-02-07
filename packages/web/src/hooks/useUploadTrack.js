import { useMutation, useQueryClient } from 'react-query';

import { queryKeys } from '../../../react-query/constants';
import { getCurrentUserToken } from '../services/auth'
import tracksApi from "../api/api-tracks";

export function useUploadTrack() {
  const userToken = getCurrentUserToken()
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (track) => tracksApi.setTrack(userToken, track),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.tracks]);
        // toast({
        //   title: 'You have reserved the track!',
        //   status: 'success',
        // });
      },
    },
  );

  return mutate;
}
