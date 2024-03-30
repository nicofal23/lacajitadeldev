const app = Vue.createApp({ 
    data() {
        return {
            cards: [
                { img: 'https://plus.unsplash.com/premium_photo-1677093905854-6347243e9b05?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Seguridad', content: 'Aquí encontraras recursos y cursos de CiberSeguridad', link: 'seguridad.html' },
                { img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Desarrollo', content: 'Aquí encontraras recursos y cursos de Desarrollo Web.', link: 'desarrollo.html' },
                { img: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Diseño', content: 'Aquí encontraras recursos y cursos de Diseño.', link: 'diseno.html' },
            ],
            mouseX: 0,
            mouseY: 0,
            mouseLeaveDelay: null,
        };
    },
    computed: {
        cardBgImage() {
            return function (imageUrl) {
                return {
                    backgroundImage: `url(${imageUrl})`
                }
            }
        },
        cardStyle() {
            const rX = this.mousePX * 30;
            const rY = this.mousePY * -30;
            return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
            };
        },
        cardBgTransform() {
            const tX = this.mousePX * -40;
            const tY = this.mousePY * -40;
            return {
                transform: `translateX(${tX}px) translateY(${tY}px)`
            }
        },
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
    },
    methods: {
        handleMouseMove(event, index) {
            const rect = event.currentTarget.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            this.mouseX = event.pageX - rect.left - this.width / 2;
            this.mouseY = event.pageY - rect.top - this.height / 2;
        },
        handleMouseLeave(index) {
            this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
            }, 1000);
        },
        redirectToPage(link) {
            window.location.href = link;
        }
    }
});

app.mount('#app');
