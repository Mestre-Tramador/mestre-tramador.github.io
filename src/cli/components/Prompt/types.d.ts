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

import type { CommandHandler } from '@models/Command.types';
import type { PromptProtectedKeys } from '@enums/PromptProtectedKeys';

/**
 * Definitions of the Prompt.
 *
 * @author Mestre-Tramador
 */
declare namespace PromptDef {
    /**
     * Properties of the Prompt.
     */
    type Props = {
        onCommand: CommandHandler;
    };

    /**
     * Type for Callbacks hooks of the Prompt.
     */
    namespace Callbacks {
        /**
         * Type for `focusOnHidden` callback.
         */
        type Focus = React.MouseEventHandler<HTMLElement>;

        /**
         * Type for `handleHiddenInput` callback.
         */
        type Handle = React.KeyboardEventHandler<HTMLInputElement>;

        /**
         * Type for `setHiddenInput` callback.
         */
        type Input = React.ChangeEventHandler<HTMLInputElement>;

        /**
         * Type for `measureTextboxWidth` callback.
         */
        type Measurement = (text: string) => number;

        /**
         * Type for `moveCaret` callback.
         */
        type Move = (key: PromptProtectedKeys) => void;
    }
}

export { PromptDef };
