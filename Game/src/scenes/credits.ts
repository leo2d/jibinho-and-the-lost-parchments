import { Loader } from '../core/loader';
import { Input } from 'phaser';


export default class CreditsScene extends Phaser.Scene {
    public constructor(key) {
        super(key);
    }

    public cursorKeys: Input.Keyboard.CursorKeys;

    public init() {

    }

    public preload() {
        new Loader(this.load);
    }
    public create() {
        this.add.tileSprite(625, 320, 1250, 640, 'credits');

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.cursorKeys.space.on('down', () => {
            // window.location.reload();


            document.querySelector("#body").setAttribute("width","1220")
            document.querySelector("#body").setAttribute("height","680")
            document.querySelector("#body").innerHTML = this.getHtmlVideo();

            document.querySelector("#head").innerHTML = `
            <script>
    
                document.body.onkeyup = function (e) {
                    if (e.keyCode == 32) {
                        top.window.location.reload(1);
                    }
                }
            </script>`;
        });
    }

    private getHtmlVideo(): string {
        return `
       
                <style>
            .video {
                justify-content: center;
                align-items: center;
                align-content: center;
                border: none;
                padding-left: 12.6%;
                padding-top: 8em;
                padding-bottom: 8em;
            }

            .container {
                background-image: url("../src/assets/images/scenes/video-bg.png");
                background-repeat: no-repeat;
                width: 1220 !important;
                height: 680 !important;
            }
            
            .white {
                color: white;
            }
        </style>
        <div class="container"  width="1220" height="640">

            <div class="video">
                <iframe src="https://drive.google.com/file/d/1j37Ak9Z-L76g0-OiUQ9cETCuyIBZZHx6/preview" width="600"
                    height="400"></iframe>
            </div>
        </div>


        `;
    }
}