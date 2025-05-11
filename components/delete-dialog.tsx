import { DeleteDialogProps } from '@/utils/types'
import React from 'react'
import { Dialog as PaperDialog, Portal } from 'react-native-paper'

export const Dialog: React.FC<DeleteDialogProps> = ({
    visible,
    title,
    content,
    actionButtons,
    onDismiss,
}) => {
    return (
        <Portal>
            <PaperDialog visible={visible} onDismiss={onDismiss}>
                <PaperDialog.Title>{title}</PaperDialog.Title>
                <PaperDialog.Content>{content}</PaperDialog.Content>
                <PaperDialog.Actions>{actionButtons}</PaperDialog.Actions>
            </PaperDialog>
        </Portal>
    )
}
