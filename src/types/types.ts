import { StackScreenProps } from '@react-navigation/stack';

export type StackParams = {
    Home: undefined,
    Search: { query: string }
};

export type HomeProps = StackScreenProps<StackParams, 'Home'>;

export type SearchProps = StackScreenProps<StackParams, 'Search'>;
