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

/**
 * Key Codes from keys that execute special actions
 * on the Prompt.
 *
 * @author Mestre-Tramador
 */
enum PromptProtectedKeys {
    /**
     * "Enter" key, of code `13`.
     */
    Enter = 'Enter',

    /**
     * "Delete" key, of code `46`.
     */
    Delete = 'Delete',

    /**
     * "Down arrow" key, of code `40`.
     */
    ArrowDown = 'ArrowDown',

    /**
     * "Left arrow" key, of code `37`.
     */
    ArrowLeft = 'ArrowLeft',

    /**
     * "Right arrow" key, of code `39`.
     */
    ArrowRight = 'ArrowRight',

    /**
     * "Up arrow" key, of code `38`.
     */
    ArrowUp = 'ArrowUp'
}

export { PromptProtectedKeys };
