import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteFromFavouritesData,
  postToFavourtiesData,
} from '../services/favourites';
import type { AxiosError } from 'axios';
import { useToast } from '@chakra-ui/react';
import type { IFavPokemonData } from '../types/favourites';

interface IFavMuttations {
  pokemonName: string;
  pokemonID: number;
  setFavStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
}

type MyErrorResponse = {
  error: string;
};

export const useFavMutations = ({
  pokemonName,
  pokemonID,
  setFavStatus,
}: IFavMuttations) => {
  const queryClient = useQueryClient();

  const toast = useToast();

  const capitalizedName =
    pokemonName.at(0)?.toUpperCase() + pokemonName.slice(1);

  const { mutate: removeFromFav } = useMutation({
    mutationFn: (id: number) => deleteFromFavouritesData(id),
    onSuccess: () => {
      toast({
        title: 'Removed',
        description: `${capitalizedName} removed from favourites`,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
      setFavStatus(false);
      queryClient.invalidateQueries({ queryKey: ['isFav', pokemonID] });
    },
    onError: (error: AxiosError<MyErrorResponse>) => {
      toast({
        title: 'Error',
        description: `${
          error.response?.data?.error || 'Unable to remove from favourites'
        }`,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const { mutate: addToFav } = useMutation({
    mutationFn: (newData: IFavPokemonData) => postToFavourtiesData(newData),
    onSuccess: () => {
      toast({
        title: 'Added',
        description: `${capitalizedName} added to favourites`,
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
      setFavStatus(true);
      queryClient.invalidateQueries({ queryKey: ['isFav', pokemonID] });
    },
    onError: (error: AxiosError<MyErrorResponse>) => {
      toast({
        title: 'Error',
        description: `${
          error.response?.data?.error || 'Unable to add to favourites'
        }`,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  return { removeFromFav, addToFav };
};
