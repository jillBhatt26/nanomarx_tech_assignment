import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import Story from '../components/Story';
import Comment from '../components/Comment';
import { StoryServices } from '../services/story';
import { CommentServices } from '../services/comment';

const SearchPage = () => {
    const [inputQuery, setInputQuery] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [searchWhere, setSearchWhere] = useState('stories');
    const [hasFinishedSearch, setHasFinishedSearch] = useState(false);
    const [results, setResults] = useState([]);

    const searchInputsSchema = useMemo(
        () =>
            yup.object({
                q: yup
                    .string('Query should be string')
                    .trim()
                    .required('Query is required')
                    .max(
                        255,
                        'Query should not be more than 255 characters long'
                    )
            }),
        []
    );

    // effects
    useEffect(() => {
        setDisableButton(loading);
    }, [loading, searchError]);

    useEffect(() => {
        setHasFinishedSearch(false);
    }, [searchWhere]);

    useEffect(() => {
        setResults([]);
        setHasFinishedSearch(false);
    }, [inputQuery]);

    // event handlers
    const handleSearch = async e => {
        e.preventDefault();
        setHasFinishedSearch(false);

        try {
            setLoading(true);

            const searchInputs = await searchInputsSchema.validate({
                q: inputQuery
            });

            if (searchWhere === 'stories') {
                const searchResponseData = await StoryServices.searchStories(
                    searchInputs.q
                );

                const { success, data, error } = searchResponseData;

                if (success && data && data.stories) {
                    setResults(data.stories);
                }

                setSearchError(error);
            }

            if (searchWhere === 'comments') {
                const searchResponseData = await CommentServices.searchComment(
                    searchInputs.q
                );

                const { success, data, error } = searchResponseData;

                if (success && data && data.comments) {
                    setResults(data.comments);
                }

                setSearchError(error);
            }
        } catch (error) {
            if (error instanceof yup.ValidationError)
                setSearchError(error.message);
            else setSearchError(error.error ?? 'Failed to conduct the search!');
        } finally {
            setLoading(false);
            setHasFinishedSearch(true);
        }
    };

    return (
        <div className="px-5 md:pl-12 mt-5 md:mt-0">
            <h1 className="text mb-5">Search</h1>

            {searchError && (
                <p className="bg-[#451714] text-[#FFFFFFDE] w-full rounded-sm py-2 px-5 my-5 border-t border-[#626262]">
                    {searchError}
                </p>
            )}

            <form
                className="space-y-5 flex flex-col sm:flex-row space-x-3 lg:space-y-0"
                onSubmit={handleSearch}
            >
                <div className="w-full sm:w-xs">
                    <input
                        type="text"
                        className="bg-[#141414] outline-1 outline-[#333] flex-1 w-full px-2 py-1"
                        value={inputQuery}
                        onChange={e => setInputQuery(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={disableButton}
                    className="text-sm py-1.5 bg-[#181818] text-white outline-1 outline-[#333] px-3 hover:cursor-pointer hover:bg-[#202020] w-fit md:max-w-full"
                >
                    Search
                </button>
            </form>

            <p className="my-5">Search:</p>
            <div className="flex space-x-5">
                <label className="space-x-1">
                    <input
                        type="radio"
                        value="stories"
                        checked={searchWhere === 'stories'}
                        onChange={e => setSearchWhere(e.target.value)}
                    />
                    <span>Stories</span>
                </label>
                <label className="space-x-1">
                    <input
                        type="radio"
                        value="comments"
                        checked={searchWhere === 'comments'}
                        onChange={e => setSearchWhere(e.target.value)}
                    />
                    <span>Comments</span>
                </label>
            </div>

            {hasFinishedSearch && (
                <p className="mt-5">
                    {results.length} results for {inputQuery}
                </p>
            )}

            {hasFinishedSearch &&
                searchWhere === 'stories' &&
                results.length > 0 && (
                    <ul className="mt-5">
                        {results.map((result, idx) => (
                            <Story key={result._id ?? idx} story={result} />
                        ))}
                    </ul>
                )}

            {hasFinishedSearch &&
                searchWhere === 'comments' &&
                results.length > 0 && (
                    <ul className="mt-5">
                        {results.map((result, idx) => (
                            <Comment key={result._id ?? idx} comment={result} />
                        ))}
                    </ul>
                )}
        </div>
    );
};

export default SearchPage;
