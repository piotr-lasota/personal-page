import { Box, Divider, Grid, Typography } from '@mui/material';
import { Link } from 'gatsby';
import React, { useCallback, useState } from 'react';
import { Button } from 'gatsby-theme-material-ui';
import { PublishedComment } from '../../models';
import EditableComment from './EditableComment';

const latestFirst = (a: PublishedComment, b: PublishedComment) =>
  b.publishedAt.getTime() - a.publishedAt.getTime();

const useListOfCommentsToDelete = () => {
  const [markedCommentsMap, setMarkedCommentsMap] = useState(
    new Map<string, PublishedComment>()
  );

  const mark = useCallback(
    (comment: PublishedComment) => {
      if (markedCommentsMap.has(comment.id)) {
        return; // keep the reference if nothing changed
      }

      setMarkedCommentsMap((previouslyMarkedComments) =>
        new Map(previouslyMarkedComments).set(comment.id, comment)
      );
    },
    [markedCommentsMap, setMarkedCommentsMap]
  );

  const unmark = useCallback(
    (comment: PublishedComment) => {
      if (!markedCommentsMap.has(comment.id)) {
        return; // keep the reference if nothing changed
      }

      setMarkedCommentsMap((previouslyMarkedComments) => {
        const currentlyMarkedComments = new Map(previouslyMarkedComments);
        currentlyMarkedComments.delete(comment.id);
        return currentlyMarkedComments;
      });
    },
    [markedCommentsMap, setMarkedCommentsMap]
  );

  const clear = useCallback(
    () => setMarkedCommentsMap(new Map<string, PublishedComment>()),
    [setMarkedCommentsMap]
  );

  return [markedCommentsMap, mark, unmark, clear] as const;
};

export type ToggleableCommentsListProps = {
  title: string;
  slug: string;
  comments: PublishedComment[];
  onDeleteCommentsClicked?: (comments: PublishedComment[]) => void;
};
const ToggleableCommentsList = ({
  title,
  slug,
  comments,
  onDeleteCommentsClicked = () => {}
}: ToggleableCommentsListProps): JSX.Element => {
  const [
    mapOfCommentsMarkedForDeletion,
    markForDeletion,
    unmarkForDeletion,
    clearSelection
  ] = useListOfCommentsToDelete();

  const handleCommentToggled = useCallback(
    (comment: PublishedComment, wasToggled: boolean) => {
      if (wasToggled) {
        unmarkForDeletion(comment);
      } else {
        markForDeletion(comment);
      }
    },
    [markForDeletion, unmarkForDeletion]
  );

  const handleDeleteButtonClicked = () =>
    onDeleteCommentsClicked([...mapOfCommentsMarkedForDeletion.values()]);

  return (
    <Box>
      <Typography align="center">
        Viewing {comments.length} comments for &quot;
        <Link to={`/blog/${slug}`}>{title}</Link>&quot;
      </Typography>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Button
                sx={{ width: '100%' }}
                disabled={mapOfCommentsMarkedForDeletion.size < 1}
                onClick={handleDeleteButtonClicked}
              >
                Delete selected comments
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                sx={{ width: '100%' }}
                disabled={mapOfCommentsMarkedForDeletion.size < 1}
                onClick={clearSelection}
              >
                Clear selection
              </Button>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
        {comments.sort(latestFirst).map((comment) => (
          <Grid item key={`${comment.author}-${comment.publishedAt}`}>
            <EditableComment
              isToggled={mapOfCommentsMarkedForDeletion.has(comment.id)}
              comment={comment}
              onToggleClicked={handleCommentToggled}
            />
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToggleableCommentsList;
