//#region License
/**
 * HIGH is a single page application that govern Mestre-Tramador's virtual repositories and data.
 * Copyright (C) 2023  Mestre-Tramador
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
//#endregion

import React, { useCallback, useRef, useState } from 'react';
import { PromptProtectedKeys } from '@enums/PromptProtectedKeys';

import type { PromptDef as Def } from './types';

import './styles.scss';

/**
 * The Prompt of the CLI.
 *
 * @param onCommand Handler for when commands are prompted.
 * @returns A `<footer />` element with an infinite line for the input,
 *          plus the caret.
 * @author Mestre-Tramador
 */
function Prompt({ onCommand }: Def.Props): JSX.Element {
    //#region States
    /**
     * The input content.
     */
    const [input, setInput] = useState<string>('');

    /**
     * The caret index on the line.
     */
    const [caretAt, setCaretAt] = useState<number>(0);
    //#endregion

    //#region Refs
    /**
     * References a hidden `<input />` element with
     * the real value.
     */
    const hidden = useRef<HTMLInputElement>(null);

    /**
     * References the `<span />` that operates as
     * a caret for the prompt.
     */
    const caret = useRef<HTMLSpanElement>(null);
    //#endregion

    //#region Callbacks
    /**
     * Focus on the hidden input to enable edition and other functions.
     */
    const focusOnHidden = useCallback<Def.Callbacks.Focus>(() => hidden.current?.focus(), []);

    /**
     * Set the current value on the input.
     *
     * **Currently this function does not handle unsupported characters.**
     */
    const setHiddenInput = useCallback<Def.Callbacks.Input>(
        ({ currentTarget }) => setInput(currentTarget.value),
        []
    );

    /**
     * Measure the width of the textbox by creating an invisible copy.
     *
     * The original cannot be taken because its width is infinite, and
     * it also have margins, thus it cannot assert the real width of the
     * input text.
     */
    const measureTextboxWidth = useCallback<Def.Callbacks.Measurement>((text) => {
        /**
         * The textbox whole element.
         */
        const textbox = caret.current?.parentElement;

        if (!textbox) {
            return 0;
        }

        /**
         * Textbox computed style on the window.
         */
        const computedStyle = window.getComputedStyle(textbox);

        /**
         * This new `<div />` element will copy most of the original
         * style, but will not have any width setting.
         */
        const div = document.createElement('div');

        div.style.setProperty('visibility', 'hidden');
        div.style.setProperty('position', 'absolute');
        div.style.setProperty('font-size', computedStyle.fontSize);
        div.style.setProperty('font-family', computedStyle.fontFamily);

        div.innerText = text;

        document.body.appendChild(div);

        /**
         * The rectangle representing the new `<div />`.
         */
        const rect = div.getBoundingClientRect();

        div.remove();

        return rect.width * -1;
    }, []);

    /**
     * Move the caret matching a series of characters to its right.
     *
     * The number of characters at right could be also zero.
     */
    const moveCaret = useCallback<Def.Callbacks.Move>(
        (key) => {
            /**
             * Characters at the caret right.
             */
            let charsAtRight = '';

            /**
             * The start index to slice the input content.
             */
            let sliceStart = input.length - (hidden.current?.selectionStart ?? 0);

            /**
             * The end index to slice the input content.
             */
            let sliceEnd: number | undefined = undefined;

            if (sliceStart > input.length) {
                sliceStart = input.length;
            }

            if (sliceStart < 0) {
                sliceStart = 0;
            }

            switch (key) {
                case PromptProtectedKeys.ArrowLeft:
                case PromptProtectedKeys.ArrowRight:
                case PromptProtectedKeys.Delete:
                    if (key === PromptProtectedKeys.ArrowLeft && sliceStart > input.length - 1) {
                        sliceStart--;
                    }

                    sliceStart = input.length - sliceStart;

                    if (
                        key === PromptProtectedKeys.ArrowRight ||
                        key === PromptProtectedKeys.Delete
                    ) {
                        sliceStart += 1;

                        break;
                    }

                    sliceStart -= 1;
                    break;
                case PromptProtectedKeys.ArrowUp:
                case PromptProtectedKeys.ArrowDown:
                    sliceStart = 0;

                    if (key === PromptProtectedKeys.ArrowDown) {
                        sliceEnd = 0;
                    }
                    break;
            }

            charsAtRight = input.slice(sliceStart, sliceEnd);

            setCaretAt(measureTextboxWidth(charsAtRight));
        },
        [input, measureTextboxWidth]
    );

    /**
     * Handle key pressing to, if a protected one is pressed,
     * execute its function.
     */
    const handleHiddenInput = useCallback<Def.Callbacks.Handle>(
        async (event) => {
            /**
             * The pressed key.
             */
            const key = event.key;

            if (key === PromptProtectedKeys.Enter) {
                setInput('');
                setCaretAt(0);

                await onCommand(input);

                return;
            }

            /**
             * The pressed key as protected one.
             */
            const keyAsProtected = key as PromptProtectedKeys;

            /**
             * The remaining protected keys to check.
             */
            const protectedKeys: PromptProtectedKeys[] = [
                PromptProtectedKeys.Delete,
                PromptProtectedKeys.ArrowDown,
                PromptProtectedKeys.ArrowLeft,
                PromptProtectedKeys.ArrowRight,
                PromptProtectedKeys.ArrowUp
            ];

            if (!protectedKeys.includes(keyAsProtected)) {
                return;
            }

            moveCaret(keyAsProtected);
        },
        [onCommand, input, moveCaret]
    );
    //#endregion

    return (
        <footer className="relative onboard-font onboard-prompt" onClick={focusOnHidden}>
            <div role="textbox" inputMode="text" className="w-pc-100 inline overflow-auto">
                {input}

                <span
                    ref={caret}
                    className="relative inline theme-dark-reversed onboard-prompt-caret "
                    style={{ left: `${caretAt + 1}px` }}
                />
            </div>

            <input
                type="text"
                ref={hidden}
                className="absolute w-0 h-0 theme-transparent"
                value={input}
                autoFocus
                onChange={setHiddenInput}
                onKeyDown={handleHiddenInput}
            />
        </footer>
    );
}

export default Prompt;
